import { FC } from 'react';

interface TemplateSelectorProps {
  selected: 'minimal' | 'detailed' | 'visual' | 'storytelling';
  onChange: (template: 'minimal' | 'detailed' | 'visual' | 'storytelling') => void;
}

const templates = [
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Clean and focused on content',
    preview: '□ ─ ─',
  },
  {
    id: 'detailed' as const,
    name: 'Detailed',
    description: 'Comprehensive with all sections',
    preview: '□ □ □',
  },
  {
    id: 'visual' as const,
    name: 'Visual',
    description: 'Image-heavy layout',
    preview: '▣ ▣ ▣',
  },
  {
    id: 'storytelling' as const,
    name: 'Storytelling',
    description: 'Narrative-focused design',
    preview: '─ □ ─',
  },
];

const TemplateSelector: FC<TemplateSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
      <div className="space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selected === template.id
                ? 'border-primary bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{template.name}</span>
              <span className="text-2xl opacity-50">{template.preview}</span>
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;