import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, GripVertical, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { NODE_LIBRARY_CATALOG, NodeCategory, NodeDefinition } from '../types/nodeTypes';

export const NodeLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Triggers: true,
    AI: true,
    Communication: true,
    Database: true,
    Logic: true,
    Scheduling: true,
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const categories: NodeCategory[] = [
    'Triggers', 'AI', 'Communication', 'Database', 'Logic', 'Storage',
    'Documents', 'Notifications', 'Scheduling', 'Utilities'
  ];

  const onDragStart = (event: React.DragEvent, nodeDef: NodeDefinition) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeDef));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-slate-950/90 border-r border-slate-800 flex flex-col h-full text-slate-300 z-10">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Node Library</h3>
          <span className="text-[10px] text-brand-400 font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30">
            35 Connectors
          </span>
        </div>
        <Input
          placeholder="Search triggers & actions..."
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Accordion List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {categories.map((cat) => {
          const items = NODE_LIBRARY_CATALOG.filter(
            (item) => item.category === cat && item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (items.length === 0 && searchTerm) return null;

          const isExpanded = expandedCategories[cat] || !!searchTerm;

          return (
            <div key={cat} className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-200 hover:bg-slate-800/50 transition-colors"
              >
                <span>{cat} ({items.length})</span>
                {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="p-2 space-y-1.5 border-t border-slate-800/60 bg-slate-950/60">
                  {items.map((nodeDef) => (
                    <div
                      key={nodeDef.type}
                      draggable
                      onDragStart={(e) => onDragStart(e, nodeDef)}
                      className="group flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-brand-500/50 hover:bg-slate-800/60 cursor-grab active:cursor-grabbing transition-all duration-150"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-brand-300">
                            {nodeDef.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">{nodeDef.description}</p>
                        </div>
                      </div>
                      {nodeDef.category === 'AI' && (
                        <Sparkles className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
