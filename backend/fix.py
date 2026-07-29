import os, glob, re
for filepath in glob.glob('app/models/*.py'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace ForeignKey("...", index=True) with ForeignKey("..."), index=True
    # The regex needs to handle cases like ForeignKey("workspaces.id", index=True)
    new_content = re.sub(r'ForeignKey\(([\"\'][^\"\']+[\"\']),\s*index=True\)', r'ForeignKey(\1), index=True', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
print("Fix completed")
