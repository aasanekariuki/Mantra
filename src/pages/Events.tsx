import { useMemo, useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { FilterBar } from "../components/ui/FilterBar";
import { EventCard } from "../components/cards/EventCard";
import { events } from "../data/events";

const statusOptions = ["All", "Upcoming", "Past"];

export default function Events() {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.category)))], []);

  const filtered = events.filter((event) => {
    const matchesStatus = status === "All" || event.status === status.toLowerCase();
    const matchesCategory = category === "All" || event.category === category;
    return matchesStatus && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Events"
        title="Where MANTRA meets in person."
        description="Circle sessions, sport, mentorship mixers and research conversations — this list will grow as more chapters launch."
      />

      <section className="py-8 md:py-12">
        <div className="container-mantra">
          <div className="flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-center md:justify-between">
            <FilterBar options={statusOptions} active={status} onChange={setStatus} />
            <FilterBar options={categories} active={category} onChange={setCategory} />
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-mist">No events match those filters yet — check back soon.</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {filtered.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
