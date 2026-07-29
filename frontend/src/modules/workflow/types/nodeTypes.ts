
export type NodeCategory = 
  | 'Triggers'
  | 'Communication'
  | 'AI'
  | 'Logic'
  | 'Database'
  | 'Storage'
  | 'Documents'
  | 'Notifications'
  | 'Scheduling'
  | 'Utilities';

export interface NodeDefinition {
  type: string;
  name: string;
  category: NodeCategory;
  description: string;
  iconName: string;
  defaultConfig: Record<string, any>;
  inputsCount: number;
  outputsCount: number;
}

export const NODE_LIBRARY_CATALOG: NodeDefinition[] = [
  // Triggers & Scheduling
  { type: 'manual_trigger', name: 'Manual Trigger', category: 'Triggers', description: 'Starts workflow manually via button click or API', iconName: 'Play', defaultConfig: { notes: '' }, inputsCount: 0, outputsCount: 1 },
  { type: 'webhook', name: 'Webhook Listener', category: 'Triggers', description: 'Triggers workflow on incoming HTTP POST/GET request', iconName: 'Webhook', defaultConfig: { path: '/webhook/v1', method: 'POST' }, inputsCount: 0, outputsCount: 1 },
  { type: 'schedule', name: 'Cron Schedule', category: 'Scheduling', description: 'Executes automatically on cron interval or timer', iconName: 'Clock', defaultConfig: { cron: '0 * * * *' }, inputsCount: 0, outputsCount: 1 },

  // Communication & Email
  { type: 'gmail', name: 'Gmail Connector', category: 'Communication', description: 'Trigger or send emails via Google Workspace', iconName: 'Mail', defaultConfig: { action: 'send_email', to: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'outlook', name: 'Outlook Email', category: 'Communication', description: 'Microsoft 365 Outlook mail triggers & actions', iconName: 'Mail', defaultConfig: { folder: 'Inbox' }, inputsCount: 1, outputsCount: 1 },
  { type: 'slack', name: 'Slack Bot Notice', category: 'Communication', description: 'Post rich block messages & alerts to Slack channels', iconName: 'MessageSquare', defaultConfig: { channel: '#general', message: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'discord', name: 'Discord Webhook', category: 'Communication', description: 'Send embed messages to Discord servers', iconName: 'MessageSquare', defaultConfig: { webhookUrl: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'telegram', name: 'Telegram Bot', category: 'Communication', description: 'Send messages & media via Telegram Bot API', iconName: 'Send', defaultConfig: { chatId: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'whatsapp', name: 'WhatsApp Business', category: 'Communication', description: 'Send automated WhatsApp message templates', iconName: 'PhoneCall', defaultConfig: { phone: '' }, inputsCount: 1, outputsCount: 1 },

  // AI & Machine Learning
  { type: 'ai_agent', name: 'Autonomous AI Agent', category: 'AI', description: 'Multi-step reasoning LLM agent with tool calling', iconName: 'Bot', defaultConfig: { model: 'gpt-4o', systemPrompt: 'You are an enterprise business assistant.' }, inputsCount: 1, outputsCount: 1 },
  { type: 'ocr', name: 'Document OCR Scanner', category: 'Documents', description: 'Extract key-value pairs & tables from scanned images', iconName: 'Scan', defaultConfig: { format: 'json' }, inputsCount: 1, outputsCount: 1 },
  { type: 'pdf_reader', name: 'PDF Reader Parser', category: 'Documents', description: 'Extract text, headers, and forms from PDF files', iconName: 'FileText', defaultConfig: { pageRange: 'all' }, inputsCount: 1, outputsCount: 1 },

  // Cloud Storage & Drives
  { type: 'gdrive', name: 'Google Drive', category: 'Storage', description: 'Watch folder uploads & manage Drive files', iconName: 'Folder', defaultConfig: { folderId: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'dropbox', name: 'Dropbox Storage', category: 'Storage', description: 'Sync & backup files to Dropbox', iconName: 'Folder', defaultConfig: { path: '/' }, inputsCount: 1, outputsCount: 1 },
  { type: 'onedrive', name: 'OneDrive', category: 'Storage', description: 'Microsoft OneDrive file operations', iconName: 'Cloud', defaultConfig: { folder: '/Automations' }, inputsCount: 1, outputsCount: 1 },
  { type: 'gsheets', name: 'Google Sheets', category: 'Documents', description: 'Append, update, or read Google Sheet rows', iconName: 'Table', defaultConfig: { spreadsheetId: '', sheetName: 'Sheet1' }, inputsCount: 1, outputsCount: 1 },
  { type: 'excel', name: 'Excel Online', category: 'Documents', description: 'Read/write Microsoft Excel workbooks', iconName: 'FileSpreadsheet', defaultConfig: { fileId: '' }, inputsCount: 1, outputsCount: 1 },

  // HTTP & API Connectors
  { type: 'http_request', name: 'HTTP REST Request', category: 'Utilities', description: 'Make arbitrary HTTP GET/POST/PUT calls', iconName: 'Globe', defaultConfig: { url: 'https://api.example.com', method: 'GET' }, inputsCount: 1, outputsCount: 1 },
  { type: 'rest_api', name: 'Custom REST API', category: 'Utilities', description: 'Authenticated enterprise REST service integration', iconName: 'Code', defaultConfig: { endpoint: '' }, inputsCount: 1, outputsCount: 1 },

  // Databases & Caching
  { type: 'postgres', name: 'PostgreSQL DB', category: 'Database', description: 'Execute SQL queries or CDC database triggers', iconName: 'Database', defaultConfig: { query: 'SELECT * FROM users LIMIT 10;' }, inputsCount: 1, outputsCount: 1 },
  { type: 'mysql', name: 'MySQL DB', category: 'Database', description: 'Connect & query MySQL relational databases', iconName: 'Database', defaultConfig: { query: 'SELECT 1;' }, inputsCount: 1, outputsCount: 1 },
  { type: 'mongodb', name: 'MongoDB NoSQL', category: 'Database', description: 'Insert, update or query BSON documents', iconName: 'Database', defaultConfig: { collection: 'events' }, inputsCount: 1, outputsCount: 1 },
  { type: 'redis', name: 'Redis Cache', category: 'Database', description: 'GET/SET key-values & publish Pub/Sub topics', iconName: 'Cpu', defaultConfig: { command: 'GET', key: '' }, inputsCount: 1, outputsCount: 1 },

  // Control Logic & Routers
  { type: 'condition', name: 'If / Else Condition', category: 'Logic', description: 'Branch execution based on boolean expression', iconName: 'GitBranch', defaultConfig: { field: 'status', operator: 'equals', value: 'active' }, inputsCount: 1, outputsCount: 2 },
  { type: 'router', name: 'Multi-Path Router', category: 'Logic', description: 'Route payload across N custom evaluation paths', iconName: 'Split', defaultConfig: { routes: ['Path A', 'Path B'] }, inputsCount: 1, outputsCount: 3 },
  { type: 'merge', name: 'Merge Streams', category: 'Logic', description: 'Combine multiple execution streams into one', iconName: 'GitMerge', defaultConfig: { mode: 'combine' }, inputsCount: 2, outputsCount: 1 },
  { type: 'filter', name: 'Array Filter', category: 'Logic', description: 'Filter array items matching condition', iconName: 'Filter', defaultConfig: { condition: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'loop', name: 'For-Each Loop', category: 'Logic', description: 'Iterate over array elements sequentially or in parallel', iconName: 'Repeat', defaultConfig: { batchSize: 10 }, inputsCount: 1, outputsCount: 1 },
  { type: 'delay', name: 'Delay / Sleep', category: 'Logic', description: 'Pause execution for specified duration', iconName: 'Hourglass', defaultConfig: { durationSeconds: 60 }, inputsCount: 1, outputsCount: 1 },
  { type: 'approval', name: 'Human Approval Gate', category: 'Logic', description: 'Pause workflow until team admin approves via email/Slack', iconName: 'CheckSquare', defaultConfig: { approverRole: 'Admin' }, inputsCount: 1, outputsCount: 2 },

  // Notifications & Code
  { type: 'email', name: 'Send Email', category: 'Notifications', description: 'Send transactional HTML emails via SMTP/SendGrid', iconName: 'Mail', defaultConfig: { to: '', subject: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'sms', name: 'SMS Notice (Twilio)', category: 'Notifications', description: 'Dispatch SMS messages via Twilio API', iconName: 'Phone', defaultConfig: { to: '', body: '' }, inputsCount: 1, outputsCount: 1 },
  { type: 'function', name: 'JavaScript Code', category: 'Utilities', description: 'Run custom JS snippet to transform data payload', iconName: 'Code', defaultConfig: { code: 'return items.map(item => ({ ...item, processed: true }));' }, inputsCount: 1, outputsCount: 1 },
  { type: 'custom_code', name: 'Python Code Engine', category: 'Utilities', description: 'Execute Python 3.11 code block with Pandas/NumPy', iconName: 'Terminal', defaultConfig: { code: 'def main(input_data):\n    return {"status": "success"}' }, inputsCount: 1, outputsCount: 1 },
];
