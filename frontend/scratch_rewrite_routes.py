import re
import os

filepath = r'c:\Users\rprit\Documents\AIFlow Enterprise\frontend\src\routes\AppRoutes.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def repl(match):
    components = match.group(1).split(',')
    components = [c.strip() for c in components if c.strip()]
    path = match.group(2)
    
    if path in ['react', 'react-router-dom', './ProtectedRoute', '@/components/layout/DashboardLayout']:
        return match.group(0)
    
    if not (path.startswith('@/modules/') or path.startswith('@/pages/')):
        return match.group(0)

    res = []
    for comp in components:
        if ' as ' in comp:
            original, alias = comp.split(' as ')
            res.append(f"const {alias.strip()} = React.lazy(() => import('{path}').then(m => ({{ default: m.{original.strip()} }})));")
        else:
            res.append(f"const {comp} = React.lazy(() => import('{path}').then(m => ({{ default: m.{comp} }})));")
    return '\n'.join(res)

new_content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+[\'"]([^\'"]+)[\'"];', repl, content)

if '<React.Suspense' not in new_content:
    new_content = new_content.replace('<Routes>', '<React.Suspense fallback={<div className="flex h-full items-center justify-center p-8 text-slate-500">Loading module...</div>}>\n      <Routes>')
    new_content = new_content.replace('</Routes>', '</Routes>\n    </React.Suspense>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done parsing and rewriting routes')
