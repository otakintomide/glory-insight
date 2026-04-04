import { gloryClasses } from '../../theme/gloryTheme';

interface ArchiveFiltersProps {
  selectedType: 'all' | 'monthly' | 'quarterly';
  onTypeChange: (type: 'all' | 'monthly' | 'quarterly') => void;
  selectedYear?: number;
  onYearChange?: (year: number | undefined) => void;
  availableYears?: number[];
}

export const ArchiveFilters: React.FC<ArchiveFiltersProps> = ({
  selectedType,
  onTypeChange,
  selectedYear,
  onYearChange,
  availableYears = [],
}) => {
  const types: { value: 'all' | 'monthly' | 'quarterly'; label: string }[] = [
    { value: 'all', label: 'All Reports' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <div className="flex gap-2">
        {types.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onTypeChange(type.value)}
            className={`rounded-xl px-6 py-3 font-bold transition-all duration-300 ${
              selectedType === type.value
                ? gloryClasses.primaryCta
                : 'border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] text-[color:var(--glory-text-muted)] shadow-glory-panel hover:border-[color:var(--glory-border-strong)]'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {onYearChange && availableYears.length > 0 && (
        <select
          value={selectedYear || ''}
          onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          className="cursor-pointer rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-6 py-3 font-bold text-[color:var(--glory-text-muted)] shadow-glory-panel transition-all duration-300 hover:border-[color:var(--glory-border-strong)]"
        >
          <option value="">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
