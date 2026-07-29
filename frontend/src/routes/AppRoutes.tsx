import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

/* Public Pages */
const LandingPage = React.lazy(() => import('@/pages/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const PricingPage = React.lazy(() => import('@/pages/PricingPage').then(m => ({ default: m.PricingPage })));
const DocsPage = React.lazy(() => import('@/pages/DocsPage').then(m => ({ default: m.DocsPage })));
const LoginPage = React.lazy(() => import('@/modules/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = React.lazy(() => import('@/modules/auth/SignupPage').then(m => ({ default: m.SignupPage })));
const ForgotPasswordPage = React.lazy(() => import('@/modules/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = React.lazy(() => import('@/modules/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

/* Protected Pages */
const DashboardOverview = React.lazy(() => import('@/modules/dashboard/DashboardOverview').then(m => ({ default: m.DashboardOverview })));
const WorkflowsPage = React.lazy(() => import('@/modules/workflow/WorkflowsPage').then(m => ({ default: m.WorkflowsPage })));
const WorkflowBuilder = React.lazy(() => import('@/modules/workflow/WorkflowBuilder').then(m => ({ default: m.WorkflowBuilder })));
const ExecutionsPage = React.lazy(() => import('@/modules/executions/ExecutionsPage').then(m => ({ default: m.ExecutionsPage })));
const LiveExecutionMonitor = React.lazy(() => import('@/modules/executions/components/LiveExecutionMonitor').then(m => ({ default: m.LiveExecutionMonitor })));
const AgentStudioPage = React.lazy(() => import('@/modules/ai/pages/AgentStudioPage').then(m => ({ default: m.AgentStudioPage })));
const PromptLibraryPage = React.lazy(() => import('@/modules/ai/pages/PromptLibraryPage').then(m => ({ default: m.PromptLibraryPage })));
const KnowledgeBasePage = React.lazy(() => import('@/modules/ai/pages/KnowledgeBasePage').then(m => ({ default: m.KnowledgeBasePage })));
const AIChatPage = React.lazy(() => import('@/modules/ai/pages/AIChatPage').then(m => ({ default: m.AIChatPage })));

const AdminDashboardPage = React.lazy(() => import('@/modules/admin/pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AuditExplorerPage = React.lazy(() => import('@/modules/admin/pages/AuditExplorerPage').then(m => ({ default: m.AuditExplorerPage })));
const CredentialVaultPage = React.lazy(() => import('@/modules/admin/pages/CredentialVaultPage').then(m => ({ default: m.CredentialVaultPage })));
const OrgManagementPage = React.lazy(() => import('@/modules/admin/pages/OrgManagementPage').then(m => ({ default: m.OrgManagementPage })));

const MarketplacePage = React.lazy(() => import('@/modules/integrations/pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const InstalledAppsPage = React.lazy(() => import('@/modules/integrations/pages/InstalledAppsPage').then(m => ({ default: m.InstalledAppsPage })));
const TemplateGalleryPage = React.lazy(() => import('@/modules/integrations/pages/TemplateGalleryPage').then(m => ({ default: m.TemplateGalleryPage })));
const SDKDocsPage = React.lazy(() => import('@/modules/integrations/pages/SDKDocsPage').then(m => ({ default: m.SDKDocsPage })));

const ModelRegistryPage = React.lazy(() => import('@/modules/aiops/pages/ModelRegistryPage').then(m => ({ default: m.ModelRegistryPage })));
const PromptStudioPage = React.lazy(() => import('@/modules/aiops/pages/PromptStudioPage').then(m => ({ default: m.PromptStudioPage })));
const EvaluationDashboardPage = React.lazy(() => import('@/modules/aiops/pages/EvaluationDashboardPage').then(m => ({ default: m.EvaluationDashboardPage })));
const CostAnalyticsPage = React.lazy(() => import('@/modules/aiops/pages/CostAnalyticsPage').then(m => ({ default: m.CostAnalyticsPage })));
const AgentAnalyticsPage = React.lazy(() => import('@/modules/aiops/pages/AgentAnalyticsPage').then(m => ({ default: m.AgentAnalyticsPage })));
const RAGAnalyticsPage = React.lazy(() => import('@/modules/aiops/pages/RAGAnalyticsPage').then(m => ({ default: m.RAGAnalyticsPage })));
const GovernanceCenterPage = React.lazy(() => import('@/modules/aiops/pages/GovernanceCenterPage').then(m => ({ default: m.GovernanceCenterPage })));
const ApprovalCenterPage = React.lazy(() => import('@/modules/aiops/pages/ApprovalCenterPage').then(m => ({ default: m.ApprovalCenterPage })));
const SafetyDashboardPage = React.lazy(() => import('@/modules/aiops/pages/SafetyDashboardPage').then(m => ({ default: m.SafetyDashboardPage })));
const ModelComparisonPage = React.lazy(() => import('@/modules/aiops/pages/ModelComparisonPage').then(m => ({ default: m.ModelComparisonPage })));

const DeveloperDashboardPage = React.lazy(() => import('@/modules/developer/pages/DeveloperDashboardPage').then(m => ({ default: m.DeveloperDashboardPage })));
const PluginStudioPage = React.lazy(() => import('@/modules/developer/pages/PluginStudioPage').then(m => ({ default: m.PluginStudioPage })));
const SandboxTesterPage = React.lazy(() => import('@/modules/developer/pages/SandboxTesterPage').then(m => ({ default: m.SandboxTesterPage })));
const APIExplorerPage = React.lazy(() => import('@/modules/developer/pages/APIExplorerPage').then(m => ({ default: m.APIExplorerPage })));
const CLIDocsPage = React.lazy(() => import('@/modules/developer/pages/CLIDocsPage').then(m => ({ default: m.CLIDocsPage })));

const CloudDashboardPage = React.lazy(() => import('@/modules/cloud/pages/CloudDashboardPage').then(m => ({ default: m.CloudDashboardPage })));
const ClusterManagerPage = React.lazy(() => import('@/modules/cloud/pages/ClusterManagerPage').then(m => ({ default: m.ClusterManagerPage })));
const DeploymentCenterPage = React.lazy(() => import('@/modules/cloud/pages/DeploymentCenterPage').then(m => ({ default: m.DeploymentCenterPage })));
const BackupRestorePage = React.lazy(() => import('@/modules/cloud/pages/BackupRestorePage').then(m => ({ default: m.BackupRestorePage })));
const FeatureFlagsPage = React.lazy(() => import('@/modules/cloud/pages/FeatureFlagsPage').then(m => ({ default: m.FeatureFlagsPage })));
const CapacityPlannerPage = React.lazy(() => import('@/modules/cloud/pages/CapacityPlannerPage').then(m => ({ default: m.CapacityPlannerPage })));

const MarketplaceHomePage = React.lazy(() => import('@/modules/marketplace/pages/MarketplaceHomePage').then(m => ({ default: m.MarketplaceHomePage })));
const AssetDetailsPage = React.lazy(() => import('@/modules/marketplace/pages/AssetDetailsPage').then(m => ({ default: m.AssetDetailsPage })));
const PublisherDashboardPage = React.lazy(() => import('@/modules/marketplace/pages/PublisherDashboardPage').then(m => ({ default: m.PublisherDashboardPage })));
const BillingCenterPage = React.lazy(() => import('@/modules/marketplace/pages/BillingCenterPage').then(m => ({ default: m.BillingCenterPage })));
const SubscriptionManagerPage = React.lazy(() => import('@/modules/marketplace/pages/SubscriptionManagerPage').then(m => ({ default: m.SubscriptionManagerPage })));
const LicenseManagerPage = React.lazy(() => import('@/modules/marketplace/pages/LicenseManagerPage').then(m => ({ default: m.LicenseManagerPage })));

const RPAStudioPage = React.lazy(() => import('@/modules/hyperautomation/pages/RPAStudioPage').then(m => ({ default: m.RPAStudioPage })));
const BrowserStudioPage = React.lazy(() => import('@/modules/hyperautomation/pages/BrowserStudioPage').then(m => ({ default: m.BrowserStudioPage })));
const DocumentStudioPage = React.lazy(() => import('@/modules/hyperautomation/pages/DocumentStudioPage').then(m => ({ default: m.DocumentStudioPage })));
const OCRDashboardPage = React.lazy(() => import('@/modules/hyperautomation/pages/OCRDashboardPage').then(m => ({ default: m.OCRDashboardPage })));
const VisionDashboardPage = React.lazy(() => import('@/modules/hyperautomation/pages/VisionDashboardPage').then(m => ({ default: m.VisionDashboardPage })));
const VoiceAutomationPage = React.lazy(() => import('@/modules/hyperautomation/pages/VoiceAutomationPage').then(m => ({ default: m.VoiceAutomationPage })));
const AutomationLibraryPage = React.lazy(() => import('@/modules/hyperautomation/pages/AutomationLibraryPage').then(m => ({ default: m.AutomationLibraryPage })));

const ExecutiveDashboardPage = React.lazy(() => import('@/modules/intelligence/pages/ExecutiveDashboardPage').then(m => ({ default: m.ExecutiveDashboardPage })));
const KPICenterPage = React.lazy(() => import('@/modules/intelligence/pages/KPICenterPage').then(m => ({ default: m.KPICenterPage })));
const ForecastStudioPage = React.lazy(() => import('@/modules/intelligence/pages/ForecastStudioPage').then(m => ({ default: m.ForecastStudioPage })));
const ScenarioSimulatorPage = React.lazy(() => import('@/modules/intelligence/pages/ScenarioSimulatorPage').then(m => ({ default: m.ScenarioSimulatorPage })));
const DecisionCenterPage = React.lazy(() => import('@/modules/intelligence/pages/DecisionCenterPage').then(m => ({ default: m.DecisionCenterPage })));
const KnowledgeGraphPage = React.lazy(() => import('@/modules/intelligence/pages/KnowledgeGraphPage').then(m => ({ default: m.KnowledgeGraphPage })));
const DigitalTwinPage = React.lazy(() => import('@/modules/intelligence/pages/DigitalTwinPage').then(m => ({ default: m.DigitalTwinPage })));
const ReportsPage = React.lazy(() => import('@/modules/intelligence/pages/ReportsPage').then(m => ({ default: m.ReportsPage })));

const LakehouseDashboardPage = React.lazy(() => import('@/modules/data/pages/LakehouseDashboardPage').then(m => ({ default: m.LakehouseDashboardPage })));
const ETLStudioPage = React.lazy(() => import('@/modules/data/pages/ETLStudioPage').then(m => ({ default: m.ETLStudioPage })));
const DataCatalogPage = React.lazy(() => import('@/modules/data/pages/DataCatalogPage').then(m => ({ default: m.DataCatalogPage })));
const SQLWorkspacePage = React.lazy(() => import('@/modules/data/pages/SQLWorkspacePage').then(m => ({ default: m.SQLWorkspacePage })));
const PipelineMonitorPage = React.lazy(() => import('@/modules/data/pages/PipelineMonitorPage').then(m => ({ default: m.PipelineMonitorPage })));
const DataLineagePage = React.lazy(() => import('@/modules/data/pages/DataLineagePage').then(m => ({ default: m.DataLineagePage })));
const DataQualityPage = React.lazy(() => import('@/modules/data/pages/DataQualityPage').then(m => ({ default: m.DataQualityPage })));
const SemanticLayerPage = React.lazy(() => import('@/modules/data/pages/SemanticLayerPage').then(m => ({ default: m.SemanticLayerPage })));

const MobileDashboardPage = React.lazy(() => import('@/modules/mobile/pages/MobileDashboardPage').then(m => ({ default: m.MobileDashboardPage })));
const MobileWorkflowMonitorPage = React.lazy(() => import('@/modules/mobile/pages/MobileWorkflowMonitorPage').then(m => ({ default: m.MobileWorkflowMonitorPage })));
const MobileApprovalCenterPage = React.lazy(() => import('@/modules/mobile/pages/MobileApprovalCenterPage').then(m => ({ default: m.MobileApprovalCenterPage })));
const NotificationCenterPage = React.lazy(() => import('@/modules/mobile/pages/NotificationCenterPage').then(m => ({ default: m.NotificationCenterPage })));
const OfflineSyncManagerPage = React.lazy(() => import('@/modules/mobile/pages/OfflineSyncManagerPage').then(m => ({ default: m.OfflineSyncManagerPage })));
const DeviceManagerPage = React.lazy(() => import('@/modules/mobile/pages/DeviceManagerPage').then(m => ({ default: m.DeviceManagerPage })));
const CloudHealthMobilePage = React.lazy(() => import('@/modules/mobile/pages/CloudHealthMobilePage').then(m => ({ default: m.CloudHealthMobilePage })));
const EdgeAISettingsPage = React.lazy(() => import('@/modules/mobile/pages/EdgeAISettingsPage').then(m => ({ default: m.EdgeAISettingsPage })));

const ComplianceCenterPage = React.lazy(() => import('@/modules/enterprise/pages/ComplianceCenterPage').then(m => ({ default: m.ComplianceCenterPage })));
const PolicyCenterPage = React.lazy(() => import('@/modules/enterprise/pages/PolicyCenterPage').then(m => ({ default: m.PolicyCenterPage })));
const PartnerPortalPage = React.lazy(() => import('@/modules/enterprise/pages/PartnerPortalPage').then(m => ({ default: m.PartnerPortalPage })));
const SupportCenterPage = React.lazy(() => import('@/modules/enterprise/pages/SupportCenterPage').then(m => ({ default: m.SupportCenterPage })));
const CustomerSuccessPage = React.lazy(() => import('@/modules/enterprise/pages/CustomerSuccessPage').then(m => ({ default: m.CustomerSuccessPage })));
const OperationsCommandPage = React.lazy(() => import('@/modules/enterprise/pages/OperationsCommandPage').then(m => ({ default: m.OperationsCommandPage })));
const PublicDevPortalPage = React.lazy(() => import('@/modules/enterprise/pages/PublicDevPortalPage').then(m => ({ default: m.PublicDevPortalPage })));
const WhiteLabelManagerPage = React.lazy(() => import('@/modules/enterprise/pages/WhiteLabelManagerPage').then(m => ({ default: m.WhiteLabelManagerPage })));

const AgentStudio2Page = React.lazy(() => import('@/modules/agentic/pages/AgentStudio2Page').then(m => ({ default: m.AgentStudio2Page })));
const MultiAgentDashboardPage = React.lazy(() => import('@/modules/agentic/pages/MultiAgentDashboardPage').then(m => ({ default: m.MultiAgentDashboardPage })));
const ReasoningViewerPage = React.lazy(() => import('@/modules/agentic/pages/ReasoningViewerPage').then(m => ({ default: m.ReasoningViewerPage })));
const MemoryExplorerPage = React.lazy(() => import('@/modules/agentic/pages/MemoryExplorerPage').then(m => ({ default: m.MemoryExplorerPage })));
const SimulationStudioPage = React.lazy(() => import('@/modules/agentic/pages/SimulationStudioPage').then(m => ({ default: m.SimulationStudioPage })));
const ExecutionTimelinePage = React.lazy(() => import('@/modules/agentic/pages/ExecutionTimelinePage').then(m => ({ default: m.ExecutionTimelinePage })));

const CloudOperationsCenterPage = React.lazy(() => import('@/modules/saas/pages/CloudOperationsCenterPage').then(m => ({ default: m.CloudOperationsCenterPage })));
const TenantManagerPage = React.lazy(() => import('@/modules/saas/pages/TenantManagerPage').then(m => ({ default: m.TenantManagerPage })));
const ProvisioningCenterPage = React.lazy(() => import('@/modules/saas/pages/ProvisioningCenterPage').then(m => ({ default: m.ProvisioningCenterPage })));
const GlobalHealthDashboardPage = React.lazy(() => import('@/modules/saas/pages/GlobalHealthDashboardPage').then(m => ({ default: m.GlobalHealthDashboardPage })));
const FinOpsCostAnalyticsPage = React.lazy(() => import('@/modules/saas/pages/FinOpsCostAnalyticsPage').then(m => ({ default: m.FinOpsCostAnalyticsPage })));
const UsageAnalyticsPage = React.lazy(() => import('@/modules/saas/pages/UsageAnalyticsPage').then(m => ({ default: m.UsageAnalyticsPage })));
const MaintenanceCenterPage = React.lazy(() => import('@/modules/saas/pages/MaintenanceCenterPage').then(m => ({ default: m.MaintenanceCenterPage })));

const IndustrySolutionsCenterPage = React.lazy(() => import('@/modules/industry/pages/IndustrySolutionsCenterPage').then(m => ({ default: m.IndustrySolutionsCenterPage })));
const HealthcarePortalPage = React.lazy(() => import('@/modules/industry/pages/HealthcarePortalPage').then(m => ({ default: m.HealthcarePortalPage })));
const FinancePortalPage = React.lazy(() => import('@/modules/industry/pages/FinancePortalPage').then(m => ({ default: m.FinancePortalPage })));
const ManufacturingPortalPage = React.lazy(() => import('@/modules/industry/pages/ManufacturingPortalPage').then(m => ({ default: m.ManufacturingPortalPage })));
const RetailPortalPage = React.lazy(() => import('@/modules/industry/pages/RetailPortalPage').then(m => ({ default: m.RetailPortalPage })));
const GovernmentPortalPage = React.lazy(() => import('@/modules/industry/pages/GovernmentPortalPage').then(m => ({ default: m.GovernmentPortalPage })));
const EducationPortalPage = React.lazy(() => import('@/modules/industry/pages/EducationPortalPage').then(m => ({ default: m.EducationPortalPage })));
const SolutionDeploymentWizardPage = React.lazy(() => import('@/modules/industry/pages/SolutionDeploymentWizardPage').then(m => ({ default: m.SolutionDeploymentWizardPage })));

const PublisherPortalPage = React.lazy(() => import('@/modules/marketplace/pages/PublisherPortalPage').then(m => ({ default: m.PublisherPortalPage })));
const CertificationCenterPage = React.lazy(() => import('@/modules/marketplace/pages/CertificationCenterPage').then(m => ({ default: m.CertificationCenterPage })));
const EnterpriseAppStorePage = React.lazy(() => import('@/modules/marketplace/pages/EnterpriseAppStorePage').then(m => ({ default: m.EnterpriseAppStorePage })));
const DeveloperCommunityPage = React.lazy(() => import('@/modules/marketplace/pages/DeveloperCommunityPage').then(m => ({ default: m.DeveloperCommunityPage })));
const PackageAnalyticsPage = React.lazy(() => import('@/modules/marketplace/pages/PackageAnalyticsPage').then(m => ({ default: m.PackageAnalyticsPage })));
const PackageManagerPage = React.lazy(() => import('@/modules/marketplace/pages/PackageManagerPage').then(m => ({ default: m.PackageManagerPage })));

const EnterpriseCommandCenterPage = React.lazy(() => import('@/modules/platform/pages/EnterpriseCommandCenterPage').then(m => ({ default: m.EnterpriseCommandCenterPage })));
const GlobalSearchCenterPage = React.lazy(() => import('@/modules/platform/pages/GlobalSearchCenterPage').then(m => ({ default: m.GlobalSearchCenterPage })));
const KnowledgeGraphExplorerPage = React.lazy(() => import('@/modules/platform/pages/KnowledgeGraphExplorerPage').then(m => ({ default: m.KnowledgeGraphExplorerPage })));
const DigitalTwinStudioPage = React.lazy(() => import('@/modules/platform/pages/DigitalTwinStudioPage').then(m => ({ default: m.DigitalTwinStudioPage })));
const AIOrchestrationDashboardPage = React.lazy(() => import('@/modules/platform/pages/AIOrchestrationDashboardPage').then(m => ({ default: m.AIOrchestrationDashboardPage })));
const PredictiveOperationsCenterPage = React.lazy(() => import('@/modules/platform/pages/PredictiveOperationsCenterPage').then(m => ({ default: m.PredictiveOperationsCenterPage })));
const UnifiedAICopilotPage = React.lazy(() => import('@/modules/platform/pages/UnifiedAICopilotPage').then(m => ({ default: m.UnifiedAICopilotPage })));
const ExecutiveIntelligenceCenterPage = React.lazy(() => import('@/modules/platform/pages/ExecutiveIntelligenceCenterPage').then(m => ({ default: m.ExecutiveIntelligenceCenterPage })));
const PlatformLifecycleManagerPage = React.lazy(() => import('@/modules/platform/pages/PlatformLifecycleManagerPage').then(m => ({ default: m.PlatformLifecycleManagerPage })));

const AnalyticsPage = React.lazy(() => import('@/modules/analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const SettingsPage = React.lazy(() => import('@/modules/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div className="flex h-full items-center justify-center p-8 text-slate-500">Loading module...</div>}>
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Visual Workflow Builder (Full Screen Canvas) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/workflows/builder/:id" element={<WorkflowBuilder />} />
      </Route>

      {/* Protected Enterprise Dashboard Shell Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/executions" element={<ExecutionsPage />} />
          <Route path="/executions/monitor/:id" element={<LiveExecutionMonitor />} />

          {/* Autonomous AI Studio Routes */}
          <Route path="/ai-agent" element={<AgentStudioPage />} />
          <Route path="/ai-studio" element={<AgentStudioPage />} />
          <Route path="/prompts" element={<PromptLibraryPage />} />
          <Route path="/knowledge" element={<KnowledgeBasePage />} />
          <Route path="/chat" element={<AIChatPage />} />

          {/* Enterprise Admin Console Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/audit" element={<AuditExplorerPage />} />
          <Route path="/admin/vault" element={<CredentialVaultPage />} />
          <Route path="/admin/organization" element={<OrgManagementPage />} />

          {/* Integration Marketplace Routes */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/integrations" element={<MarketplacePage />} />
          <Route path="/installed-apps" element={<InstalledAppsPage />} />
          <Route path="/templates" element={<TemplateGalleryPage />} />
          <Route path="/sdk" element={<SDKDocsPage />} />

          {/* Enterprise AIOps Platform Routes */}
          <Route path="/aiops/models" element={<ModelRegistryPage />} />
          <Route path="/aiops/prompts" element={<PromptStudioPage />} />
          <Route path="/aiops/evaluations" element={<EvaluationDashboardPage />} />
          <Route path="/aiops/costs" element={<CostAnalyticsPage />} />
          <Route path="/aiops/agents" element={<AgentAnalyticsPage />} />
          <Route path="/aiops/rag" element={<RAGAnalyticsPage />} />
          <Route path="/aiops/governance" element={<GovernanceCenterPage />} />
          <Route path="/aiops/approvals" element={<ApprovalCenterPage />} />
          <Route path="/aiops/safety" element={<SafetyDashboardPage />} />
          <Route path="/aiops/compare" element={<ModelComparisonPage />} />

          {/* Developer Platform & Plugin Ecosystem Routes */}
          <Route path="/developer" element={<DeveloperDashboardPage />} />
          <Route path="/plugins/studio" element={<PluginStudioPage />} />
          <Route path="/developer/sandbox" element={<SandboxTesterPage />} />
          <Route path="/developer/api-explorer" element={<APIExplorerPage />} />
          <Route path="/developer/cli" element={<CLIDocsPage />} />

          {/* Enterprise Cloud Platform Routes */}
          <Route path="/cloud" element={<CloudDashboardPage />} />
          <Route path="/cloud/clusters" element={<ClusterManagerPage />} />
          <Route path="/cloud/deployments" element={<DeploymentCenterPage />} />
          <Route path="/cloud/backups" element={<BackupRestorePage />} />
          <Route path="/cloud/flags" element={<FeatureFlagsPage />} />
          <Route path="/cloud/capacity" element={<CapacityPlannerPage />} />

          {/* Commercial Marketplace & Billing Routes */}
          <Route path="/commercial-marketplace" element={<MarketplaceHomePage />} />
          <Route path="/marketplace/asset/:id" element={<AssetDetailsPage />} />
          <Route path="/publisher" element={<PublisherDashboardPage />} />
          <Route path="/billing" element={<BillingCenterPage />} />
          <Route path="/subscriptions" element={<SubscriptionManagerPage />} />
          <Route path="/licenses" element={<LicenseManagerPage />} />

          {/* Enterprise Hyper Automation Platform Routes */}
          <Route path="/rpa" element={<RPAStudioPage />} />
          <Route path="/browser-studio" element={<BrowserStudioPage />} />
          <Route path="/document-studio" element={<DocumentStudioPage />} />
          <Route path="/ocr" element={<OCRDashboardPage />} />
          <Route path="/vision" element={<VisionDashboardPage />} />
          <Route path="/voice" element={<VoiceAutomationPage />} />
          <Route path="/automation-library" element={<AutomationLibraryPage />} />

          {/* Enterprise Intelligence Platform Routes */}
          <Route path="/intelligence" element={<ExecutiveDashboardPage />} />
          <Route path="/intelligence/kpis" element={<KPICenterPage />} />
          <Route path="/intelligence/forecast" element={<ForecastStudioPage />} />
          <Route path="/intelligence/simulator" element={<ScenarioSimulatorPage />} />
          <Route path="/intelligence/recommendations" element={<DecisionCenterPage />} />
          <Route path="/intelligence/graph" element={<KnowledgeGraphPage />} />
          <Route path="/intelligence/twin" element={<DigitalTwinPage />} />
          <Route path="/intelligence/reports" element={<ReportsPage />} />

          {/* Enterprise Data Platform Routes */}
          <Route path="/data" element={<LakehouseDashboardPage />} />
          <Route path="/data/etl" element={<ETLStudioPage />} />
          <Route path="/data/catalog" element={<DataCatalogPage />} />
          <Route path="/data/sql" element={<SQLWorkspacePage />} />
          <Route path="/data/pipelines" element={<PipelineMonitorPage />} />
          <Route path="/data/lineage" element={<DataLineagePage />} />
          <Route path="/data/quality" element={<DataQualityPage />} />
          <Route path="/data/semantic" element={<SemanticLayerPage />} />

          {/* AIFlow Enterprise Mobile Platform Routes */}
          <Route path="/mobile" element={<MobileDashboardPage />} />
          <Route path="/mobile/workflows" element={<MobileWorkflowMonitorPage />} />
          <Route path="/mobile/approvals" element={<MobileApprovalCenterPage />} />
          <Route path="/mobile/notifications" element={<NotificationCenterPage />} />
          <Route path="/mobile/sync" element={<OfflineSyncManagerPage />} />
          <Route path="/mobile/devices" element={<DeviceManagerPage />} />
          <Route path="/mobile/health" element={<CloudHealthMobilePage />} />
          <Route path="/mobile/edge-ai" element={<EdgeAISettingsPage />} />

          {/* Sprint 15 Global Enterprise Platform Routes */}
          <Route path="/compliance" element={<ComplianceCenterPage />} />
          <Route path="/policies" element={<PolicyCenterPage />} />
          <Route path="/partner-portal" element={<PartnerPortalPage />} />
          <Route path="/support-center" element={<SupportCenterPage />} />
          <Route path="/customer-success" element={<CustomerSuccessPage />} />
          <Route path="/ops-command" element={<OperationsCommandPage />} />
          <Route path="/public-dev" element={<PublicDevPortalPage />} />
          <Route path="/whitelabel" element={<WhiteLabelManagerPage />} />

          {/* Release 16 — Autonomous Multi-Agent Platform Routes */}
          <Route path="/agent-studio" element={<AgentStudio2Page />} />
          <Route path="/multi-agent" element={<MultiAgentDashboardPage />} />
          <Route path="/agent-reasoning" element={<ReasoningViewerPage />} />
          <Route path="/agent-memory" element={<MemoryExplorerPage />} />
          <Route path="/agent-simulation" element={<SimulationStudioPage />} />
          <Route path="/agent-timeline" element={<ExecutionTimelinePage />} />

          {/* Release 17 — Global Managed SaaS Platform Routes */}
          <Route path="/saas/operations" element={<CloudOperationsCenterPage />} />
          <Route path="/saas/tenants" element={<TenantManagerPage />} />
          <Route path="/saas/provisioning" element={<ProvisioningCenterPage />} />
          <Route path="/saas/health" element={<GlobalHealthDashboardPage />} />
          <Route path="/saas/finops" element={<FinOpsCostAnalyticsPage />} />
          <Route path="/saas/usage" element={<UsageAnalyticsPage />} />
          <Route path="/saas/maintenance" element={<MaintenanceCenterPage />} />

          {/* Release 18 — Industry Solutions Platform Routes */}
          <Route path="/industry/solutions" element={<IndustrySolutionsCenterPage />} />
          <Route path="/industry/healthcare" element={<HealthcarePortalPage />} />
          <Route path="/industry/finance" element={<FinancePortalPage />} />
          <Route path="/industry/manufacturing" element={<ManufacturingPortalPage />} />
          <Route path="/industry/retail" element={<RetailPortalPage />} />
          <Route path="/industry/government" element={<GovernmentPortalPage />} />
          <Route path="/industry/education" element={<EducationPortalPage />} />
          <Route path="/industry/deploy" element={<SolutionDeploymentWizardPage />} />

          {/* Release 19 — Ecosystem & Marketplace */}
          <Route path="/marketplace" element={<MarketplaceHomePage />} />
          <Route path="/marketplace/publisher" element={<PublisherPortalPage />} />
          <Route path="/marketplace/certification" element={<CertificationCenterPage />} />
          <Route path="/marketplace/enterprise" element={<EnterpriseAppStorePage />} />
          <Route path="/marketplace/community" element={<DeveloperCommunityPage />} />
          <Route path="/marketplace/analytics" element={<PackageAnalyticsPage />} />
          <Route path="/marketplace/manager" element={<PackageManagerPage />} />

          {/* Release 20 — AIOS Platform */}
          <Route path="/platform" element={<EnterpriseCommandCenterPage />} />
          <Route path="/platform/search" element={<GlobalSearchCenterPage />} />
          <Route path="/platform/graph" element={<KnowledgeGraphExplorerPage />} />
          <Route path="/platform/twin" element={<DigitalTwinStudioPage />} />
          <Route path="/platform/orchestration" element={<AIOrchestrationDashboardPage />} />
          <Route path="/platform/predictive" element={<PredictiveOperationsCenterPage />} />
          <Route path="/platform/copilot" element={<UnifiedAICopilotPage />} />
          <Route path="/platform/executive" element={<ExecutiveIntelligenceCenterPage />} />
          <Route path="/platform/lifecycle" element={<PlatformLifecycleManagerPage />} />

          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </React.Suspense>
  );
};
