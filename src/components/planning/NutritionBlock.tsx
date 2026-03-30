'use client';

import { NutritionalOrientation, UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ORIENTATION_COLORS, ORIENTATION_LABELS } from '@/lib/utils';
import { canEdit } from '@/lib/permissions';

interface NutritionBlockProps {
  orientations: NutritionalOrientation[];
  role: UserRole;
}

export function NutritionBlock({ orientations, role }: NutritionBlockProps) {
  const editable = canEdit(role, 'orientation');

  return (
    <section className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">🥗</span>
          <h2 className="font-semibold text-white">Orientation nutritionnelle</h2>
        </div>
        {editable && (
          <span className="text-xs px-2 py-0.5 bg-violet-500 text-white rounded-full font-medium">
            Modifiable
          </span>
        )}
      </div>

      <div className="p-4">
        {orientations.length === 0 ? (
          <p className="text-sm text-slate-500 italic">Aucune orientation définie</p>
        ) : (
          <div className="flex flex-col gap-2">
            {orientations.map((o) => (
              <div key={o} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <Badge className={`${ORIENTATION_COLORS[o]} text-sm shrink-0`}>
                  {o}
                </Badge>
                <span className="text-sm font-medium text-slate-700">{ORIENTATION_LABELS[o]}</span>
              </div>
            ))}
          </div>
        )}

        {orientations.length > 1 && (
          <p className="text-xs text-slate-500 mt-3">
            {orientations.length} orientations combinées pour cette journée
          </p>
        )}
      </div>
    </section>
  );
}
