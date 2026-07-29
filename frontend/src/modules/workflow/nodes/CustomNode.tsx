import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import {
  Play,
  Webhook,
  Clock,
  Mail,
  MessageSquare,
  Send,
  PhoneCall,
  Bot,
  Scan,
  FileText,
  Folder,
  Cloud,
  Table,
  FileSpreadsheet,
  Globe,
  Code,
  Database,
  Cpu,
  GitBranch,
  Split,
  GitMerge,
  Filter,
  Repeat,
  Hourglass,
  CheckSquare,
  Phone,
  Terminal,
  MoreHorizontal,
  Copy,
  Trash2,
  Power,
  Sparkles,
} from 'lucide-react';
import { useWorkflowBuilderStore } from '../store/useWorkflowBuilderStore';
import { Dropdown } from '@/components/ui/Dropdown';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Play, Webhook, Clock, Mail, MessageSquare, Send, PhoneCall, Bot, Scan, FileText,
  Folder, Cloud, Table, FileSpreadsheet, Globe, Code, Database, Cpu, GitBranch, Split,
  GitMerge, Filter, Repeat, Hourglass, CheckSquare, Phone, Terminal,
};

export const CustomNode = memo(({ id, data, selected }: NodeProps) => {
  const { duplicateNode, toggleDisableNode, deleteNode, setSelectedNodeId } = useWorkflowBuilderStore();
  const IconComponent = iconMap[data.iconName as string] || Code;

  const categoryColor: Record<string, string> = {
    Triggers: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30',
    AI: 'from-brand-600/20 to-brand-cyan/20 text-brand-400 border-brand-500/40',
    Communication: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30',
    Database: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
    Logic: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30',
    Storage: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
    Utilities: 'from-slate-700/40 to-slate-800/20 text-slate-300 border-slate-700',
  };

  const inputsCount = (data.inputsCount as number) ?? 1;
  const outputsCount = (data.outputsCount as number) ?? 1;

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className={`relative w-72 rounded-2xl bg-slate-900/90 border backdrop-blur-xl p-4 shadow-2xl transition-all duration-200 group ${
        selected ? 'border-brand-500 ring-2 ring-brand-500/40 shadow-glow' : 'border-slate-800 hover:border-slate-700'
      } ${data.isDisabled ? 'opacity-50 grayscale' : ''}`}
    >
      {/* Input Handles */}
      {inputsCount > 0 &&
        Array.from({ length: inputsCount }).map((_, idx) => (
          <Handle
            key={`in-${idx}`}
            type="target"
            position={Position.Left}
            id={`input-${idx}`}
            style={{
              top: `${((idx + 1) * 100) / (inputsCount + 1)}%`,
              background: '#6366F1',
              width: 12,
              height: 12,
              border: '2px solid #0F172A',
            }}
          />
        ))}

      {/* Node Header */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${
              categoryColor[data.category as string] || categoryColor.Utilities
            } flex items-center justify-center border shrink-0`}
          >
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-100 truncate">{data.name as string}</h4>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              {data.category as string}
            </span>
          </div>
        </div>

        {/* Hover Quick Action Dropdown */}
        <Dropdown
          trigger={
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          }
          options={[
            { id: 'duplicate', label: 'Duplicate Node', icon: <Copy className="w-3.5 h-3.5" /> },
            { id: 'toggle', label: data.isDisabled ? 'Enable Node' : 'Disable Node', icon: <Power className="w-3.5 h-3.5" /> },
            { id: 'delete', label: 'Delete Node', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
          ]}
          onSelect={(opt) => {
            if (opt.id === 'duplicate') duplicateNode(id);
            if (opt.id === 'toggle') toggleDisableNode(id);
            if (opt.id === 'delete') deleteNode(id);
          }}
        />
      </div>

      {/* Node Description */}
      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
        {data.description as string}
      </p>

      {/* Status & Config Pills */}
      <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-800/80">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
        </span>
        {data.nodeType === 'ai_agent' && (
          <span className="flex items-center gap-0.5 text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
            <Sparkles className="w-2.5 h-2.5" /> GPT-4o
          </span>
        )}
      </div>

      {/* Output Handles */}
      {outputsCount > 0 &&
        Array.from({ length: outputsCount }).map((_, idx) => (
          <Handle
            key={`out-${idx}`}
            type="source"
            position={Position.Right}
            id={`output-${idx}`}
            style={{
              top: `${((idx + 1) * 100) / (outputsCount + 1)}%`,
              background: '#06B6D4',
              width: 12,
              height: 12,
              border: '2px solid #0F172A',
            }}
          />
        ))}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
