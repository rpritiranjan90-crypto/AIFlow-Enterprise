from typing import Any, Dict, List

CONNECTORS_CATALOG: List[Dict[str, Any]] = [
    # AI Providers
    {"id": "conn_openai", "name": "OpenAI GPT-4o", "category": "AI", "provider": "OpenAI", "auth_type": "APIKey", "icon_name": "Sparkles", "version": "2.1.0", "description": "Execute GPT-4o, O1 reasoning, and DALL-E image generation", "is_featured": True},
    {"id": "conn_anthropic", "name": "Anthropic Claude 3.5", "category": "AI", "provider": "Anthropic", "auth_type": "APIKey", "icon_name": "Cpu", "version": "2.0.0", "description": "Claude 3.5 Sonnet and Haiku reasoning agents", "is_featured": True},
    {"id": "conn_gemini", "name": "Google Gemini 1.5", "category": "AI", "provider": "Google", "auth_type": "APIKey", "icon_name": "Zap", "version": "1.5.0", "description": "Multimodal 2M token context window AI reasoning", "is_featured": True},
    {"id": "conn_deepseek", "name": "DeepSeek R1", "category": "AI", "provider": "DeepSeek", "auth_type": "APIKey", "icon_name": "Code", "version": "1.0.0", "description": "Open-weights reasoning model for code and math", "is_featured": True},
    {"id": "conn_mistral", "name": "Mistral Large", "category": "AI", "provider": "Mistral AI", "auth_type": "APIKey", "icon_name": "Bot", "version": "1.2.0", "description": "State-of-the-art European multilingual reasoning", "is_featured": False},

    # Google Workspace
    {"id": "conn_gmail", "name": "Gmail", "category": "Communication", "provider": "Google", "auth_type": "OAuth2", "icon_name": "Mail", "version": "1.4.0", "description": "Send emails, watch inbox webhooks, parse attachments", "is_featured": True},
    {"id": "conn_gdrive", "name": "Google Drive", "category": "Storage", "provider": "Google", "auth_type": "OAuth2", "icon_name": "Folder", "version": "1.3.0", "description": "Upload, download, and index documents for RAG", "is_featured": False},
    {"id": "conn_gsheets", "name": "Google Sheets", "category": "Productivity", "provider": "Google", "auth_type": "OAuth2", "icon_name": "Table", "version": "1.5.0", "description": "Read/write rows, format cells, append data rows", "is_featured": True},

    # Microsoft 365
    {"id": "conn_outlook", "name": "Microsoft Outlook", "category": "Communication", "provider": "Microsoft", "auth_type": "OAuth2", "icon_name": "Mail", "version": "1.2.0", "description": "Manage enterprise calendar events and email messages", "is_featured": False},
    {"id": "conn_teams", "name": "Microsoft Teams", "category": "Communication", "provider": "Microsoft", "auth_type": "OAuth2", "icon_name": "MessageSquare", "version": "1.3.0", "description": "Post adaptive cards, channel alerts, and meeting notes", "is_featured": True},
    {"id": "conn_onedrive", "name": "OneDrive", "category": "Storage", "provider": "Microsoft", "auth_type": "OAuth2", "icon_name": "Cloud", "version": "1.1.0", "description": "Sync SharePoint and OneDrive cloud documents", "is_featured": False},

    # CRM
    {"id": "conn_salesforce", "name": "Salesforce CRM", "category": "CRM", "provider": "Salesforce", "auth_type": "OAuth2", "icon_name": "Building2", "version": "2.4.0", "description": "SOQL query, Lead enrichment, Opportunity workflow triggers", "is_featured": True},
    {"id": "conn_hubspot", "name": "HubSpot CRM", "category": "CRM", "provider": "HubSpot", "auth_type": "OAuth2", "icon_name": "Users", "version": "2.1.0", "description": "Sync contact properties, deal pipelines, and marketing leads", "is_featured": True},

    # Communication & Messaging
    {"id": "conn_slack", "name": "Slack Bot", "category": "Communication", "provider": "Slack", "auth_type": "OAuth2", "icon_name": "MessageSquare", "version": "2.0.0", "description": "Post block-kit messages, listen to channel events", "is_featured": True},
    {"id": "conn_discord", "name": "Discord Webhook", "category": "Communication", "provider": "Discord", "auth_type": "APIKey", "icon_name": "MessageCircle", "version": "1.1.0", "description": "Dispatch community channel notifications", "is_featured": False},
    {"id": "conn_twilio", "name": "Twilio SMS", "category": "Communication", "provider": "Twilio", "auth_type": "APIKey", "icon_name": "Phone", "version": "1.2.0", "description": "Dispatch global SMS and WhatsApp business notices", "is_featured": False},

    # DevTools
    {"id": "conn_github", "name": "GitHub Enterprise", "category": "DevTools", "provider": "GitHub", "auth_type": "OAuth2", "icon_name": "Code", "version": "2.2.0", "description": "Listen to PR commits, post AI security code reviews", "is_featured": True},
    {"id": "conn_jira", "name": "Jira Software", "category": "DevTools", "provider": "Atlassian", "auth_type": "OAuth2", "icon_name": "CheckSquare", "version": "1.8.0", "description": "Create issue tickets, update sprint boards, sync status", "is_featured": True},
    {"id": "conn_linear", "name": "Linear", "category": "DevTools", "provider": "Linear", "auth_type": "APIKey", "icon_name": "Flame", "version": "1.3.0", "description": "High-performance issue tracking integration", "is_featured": False},

    # Databases & Storage
    {"id": "conn_postgres", "name": "PostgreSQL", "category": "DB", "provider": "PostgreSQL", "auth_type": "ConnectionString", "icon_name": "Database", "version": "2.0.0", "description": "Execute SQL queries, PgVector search, ETL pipelines", "is_featured": True},
    {"id": "conn_s3", "name": "AWS S3", "category": "Storage", "provider": "Amazon Web Services", "auth_type": "APIKey", "icon_name": "HardDrive", "version": "1.6.0", "description": "Bucket file uploads, presigned URLs, event triggers", "is_featured": True},
    {"id": "conn_snowflake", "name": "Snowflake Data Cloud", "category": "DB", "provider": "Snowflake", "auth_type": "ConnectionString", "icon_name": "Layers", "version": "1.2.0", "description": "Run analytical warehouse SQL queries and data syncs", "is_featured": False},

    # Payments & Finance
    {"id": "conn_stripe", "name": "Stripe Payments", "category": "Finance", "provider": "Stripe", "auth_type": "APIKey", "icon_name": "CreditCard", "version": "2.0.0", "description": "Listen to invoice webhooks, sync customer subscriptions", "is_featured": True},
]
