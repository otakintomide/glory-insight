import { useState, useMemo, useCallback } from 'react';
import { Search, ChevronDown, FilterX } from 'lucide-react';
import { useReports } from '../../hooks/useReports';
import { ReportCard } from '../report/ReportCard';
import { sortUiReportsForDisplay } from '../../lib/reportSort';
import { getPublishCalendarYear } from '../../lib/reportDate';
import { gloryClasses, gloryFocusRing } from '../../theme/gloryTheme';

export const ReportsArchive: React.FC = () => {
  const { reports, loading } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'monthly' | 'quarterly'>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    reports.forEach((report) => {
      years.add(report.year ?? getPublishCalendarYear(report.publish_date, report.year));
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [reports]);

  const filteredReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        report.title.toLowerCase().includes(q) ||
        report.reporting_period.toLowerCase().includes(q) ||
        report.executive_summary.toLowerCase().includes(q) ||
        (report.tags && report.tags.some((tag) => tag.toLowerCase().includes(q)));

      const matchesType = filterType === 'all' || report.type === filterType;

      const reportYear = String(report.year ?? getPublishCalendarYear(report.publish_date, report.year));
      const matchesYear = filterYear === 'all' || reportYear === filterYear;

      return matchesSearch && matchesType && matchesYear;
    });
    return sortUiReportsForDisplay(filtered);
  }, [reports, searchQuery, filterType, filterYear]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || filterType !== 'all' || filterYear !== 'all';

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterType('all');
    setFilterYear('all');
    setIsYearDropdownOpen(false);
  }, []);

  return (
    <section id="reports" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="absolute inset-0 bg-[color:var(--glory-void)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(212,175,55,0.06),transparent)]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--glory-text-soft)] sm:text-xs">
            Library
          </p>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-[color:var(--glory-text)] sm:text-3xl md:text-4xl">
            Reports archive
          </h2>
          <p className="text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)] sm:text-base">
            Published and scheduled titles. Filter by cadence or year, or search the collection.
          </p>
        </header>

        <div className="mx-auto mb-10 max-w-5xl space-y-6 md:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? gloryClasses.filterPillActive : gloryClasses.filterPill}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType('monthly')}
              className={filterType === 'monthly' ? gloryClasses.filterPillActive : gloryClasses.filterPill}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setFilterType('quarterly')}
              className={filterType === 'quarterly' ? gloryClasses.filterPillActive : gloryClasses.filterPill}
            >
              Quarterly
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--glory-text-soft)] sm:left-4 sm:h-5 sm:w-5"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Search title, period, or summary…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] py-3 pl-11 pr-4 text-[0.9375rem] font-light text-[color:var(--glory-text)] shadow-sm placeholder:text-[color:var(--glory-text-soft)] backdrop-blur-sm transition-all sm:py-3.5 sm:pl-12 ${gloryFocusRing} hover:border-[color:var(--glory-border-strong)] focus:border-[color:var(--glory-border-strong)] focus:bg-[color:var(--glory-panel-elevated)]`}
              />
            </div>

            <div className="relative sm:w-[11.25rem] sm:flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className={`flex h-full min-h-[2.75rem] w-full items-center justify-between gap-2 rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-4 py-3 text-sm font-semibold text-[color:var(--glory-text-muted)] shadow-sm transition-all hover:border-[color:var(--glory-border-strong)] hover:text-[color:var(--glory-text)] sm:py-3.5 ${gloryFocusRing}`}
              >
                <span>{filterYear === 'all' ? 'Year' : filterYear}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isYearDropdownOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-cosmos)] py-1 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterYear('all');
                      setIsYearDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[color:var(--glory-text-muted)] transition-colors hover:bg-[color:var(--glory-panel)]"
                  >
                    All years
                  </button>
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        setFilterYear(year.toString());
                        setIsYearDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[color:var(--glory-text-muted)] transition-colors hover:bg-[color:var(--glory-panel)]"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[420px] animate-pulse rounded-2xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] sm:h-[460px]"
              />
            ))}
          </div>
        ) : filteredReports.length === 0 ? (
          <div
            className="mx-auto max-w-md rounded-2xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-6 py-12 text-center shadow-glory-panel sm:px-8"
            role="status"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--glory-border)] bg-[color:var(--glory-void)]/50">
              <Search className="h-5 w-5 text-[color:var(--glory-text-soft)]" />
            </div>
            <p className="mb-2 text-base font-semibold text-[color:var(--glory-text)]">No matching reports</p>
            <p className="mb-6 text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)]">
              {hasActiveFilters
                ? 'Try a different keyword, or reset filters to see the full library.'
                : 'No reports are available in this view yet.'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className={`mx-auto inline-flex items-center gap-2 px-5 py-2.5 text-sm ${gloryClasses.secondaryCta}`}
              >
                <FilterX className="h-4 w-4" />
                Clear filters & search
              </button>
            )}
          </div>
        ) : (
          <ul className="mx-auto grid max-w-7xl list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <li key={report.id} className="flex min-h-0">
                <ReportCard report={report} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
