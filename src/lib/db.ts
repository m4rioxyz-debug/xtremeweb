import fs from 'fs';
import path from 'path';
import { Product, products as defaultProducts } from '@/data/products';
import { CompanySettings, defaultCompanySettings } from '@/data/company';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  company: string;
  email: string;
  subject: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  category: 'Technical Formulation' | 'Logistics & Export' | 'Certificate Request' | 'Jobsite Advisory';
  createdAt: string;
  description: string;
  notes?: string[];
}

export interface ContactMessage {
  id: string;
  date: string;
  type: 'contact' | 'product_inquiry';
  productName?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  subject: string;
  message: string;
  isRead: boolean;
}

export interface DatabaseSchema {
  auth: {
    username: string;
    passwordHash: string; // Plain/SHA representation for direct credential match
  };
  tickets: SupportTicket[];
  messages: ContactMessage[];
  settings: CompanySettings;
  products: Product[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'xtreme-db.json');

// Initial clean database state:
// - User: mario, Password: Marioadmin
// - Tickets: empty array (reset all support)
const defaultDb: DatabaseSchema = {
  auth: {
    username: 'mario',
    passwordHash: 'Marioadmin'
  },
  tickets: [],
  messages: [],
  settings: defaultCompanySettings,
  products: defaultProducts
};

function ensureDbExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  }
}

export function readDb(): DatabaseSchema {
  ensureDbExists();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return {
      auth: data.auth || defaultDb.auth,
      tickets: Array.isArray(data.tickets) ? data.tickets : [],
      messages: Array.isArray(data.messages) ? data.messages : [],
      settings: data.settings ? { ...defaultCompanySettings, ...data.settings } : defaultCompanySettings,
      products: Array.isArray(data.products) && data.products.length > 0 ? data.products : defaultProducts
    };
  } catch (error) {
    console.error('Error reading database file, using fallback defaults:', error);
    return defaultDb;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbExists();
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    console.error('Error writing database file:', error);
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch {
        // Ignore cleanup error
      }
    }
    // Direct write fallback
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}

// -------------------------------------------------------------
// Auth Helpers
// -------------------------------------------------------------
export function verifyAdminCredentials(user: string, pass: string): boolean {
  const db = readDb();
  const validUser = db.auth.username.toLowerCase();
  const validPass = db.auth.passwordHash;
  return user.trim().toLowerCase() === validUser && pass === validPass;
}

// -------------------------------------------------------------
// Tickets Helpers
// -------------------------------------------------------------
export function getTickets(): SupportTicket[] {
  return readDb().tickets;
}

export function createTicket(ticketData: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt'>): SupportTicket {
  const db = readDb();
  const now = new Date();
  const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newTicket: SupportTicket = {
    ...ticketData,
    id: `tk-${Date.now()}`,
    ticketNumber: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: dateFormatted
  };

  db.tickets.unshift(newTicket);
  writeDb(db);
  return newTicket;
}

export function updateTicket(id: string, updates: Partial<SupportTicket>): SupportTicket | null {
  const db = readDb();
  const index = db.tickets.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.tickets[index] = { ...db.tickets[index], ...updates };
  writeDb(db);
  return db.tickets[index];
}

export function deleteTicket(id: string): boolean {
  const db = readDb();
  const originalLength = db.tickets.length;
  db.tickets = db.tickets.filter((t) => t.id !== id);
  if (db.tickets.length !== originalLength) {
    writeDb(db);
    return true;
  }
  return false;
}

export function resetTickets(): void {
  const db = readDb();
  db.tickets = [];
  writeDb(db);
}

// -------------------------------------------------------------
// Contact Messages Helpers
// -------------------------------------------------------------
export function getMessages(): ContactMessage[] {
  return readDb().messages;
}

export function createMessage(msgData: Omit<ContactMessage, 'id' | 'date' | 'isRead'>): ContactMessage {
  const db = readDb();
  const now = new Date();
  const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMsg: ContactMessage = {
    ...msgData,
    id: `msg-${Date.now()}`,
    date: dateFormatted,
    isRead: false
  };

  db.messages.unshift(newMsg);
  writeDb(db);
  return newMsg;
}

export function updateMessage(id: string, updates: Partial<ContactMessage>): ContactMessage | null {
  const db = readDb();
  const index = db.messages.findIndex((m) => m.id === id);
  if (index === -1) return null;

  db.messages[index] = { ...db.messages[index], ...updates };
  writeDb(db);
  return db.messages[index];
}

export function markAllMessagesAsRead(): void {
  const db = readDb();
  db.messages = db.messages.map((m) => ({ ...m, isRead: true }));
  writeDb(db);
}

export function deleteMessage(id: string): boolean {
  const db = readDb();
  const originalLength = db.messages.length;
  db.messages = db.messages.filter((m) => m.id !== id);
  if (db.messages.length !== originalLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// Company Settings Helpers
// -------------------------------------------------------------
export function getCompanySettings(): CompanySettings {
  return readDb().settings;
}

export function updateCompanySettings(updates: Partial<CompanySettings>): CompanySettings {
  const db = readDb();
  db.settings = {
    ...db.settings,
    ...updates,
    socialLinks: {
      ...db.settings.socialLinks,
      ...(updates.socialLinks || {})
    }
  };
  writeDb(db);
  return db.settings;
}

export function resetCompanySettings(): CompanySettings {
  const db = readDb();
  db.settings = defaultCompanySettings;
  writeDb(db);
  return db.settings;
}

// -------------------------------------------------------------
// Products Helpers
// -------------------------------------------------------------
export function getProducts(): Product[] {
  return readDb().products;
}

export function createProduct(prodData: Omit<Product, 'id'>): Product {
  const db = readDb();
  const id = prodData.slug || `prod-${Date.now()}`;
  const newProduct: Product = {
    ...prodData,
    id
  };
  db.products.unshift(newProduct);
  writeDb(db);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = { ...db.products[index], ...updates };
  writeDb(db);
  return db.products[index];
}

export function deleteProduct(id: string): boolean {
  const db = readDb();
  const originalLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== originalLength) {
    writeDb(db);
    return true;
  }
  return false;
}

export function resetProducts(): Product[] {
  const db = readDb();
  db.products = defaultProducts;
  writeDb(db);
  return db.products;
}
