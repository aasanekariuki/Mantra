import { Calendar, MapPin } from "lucide-react";
import type { EventItem } from "../../types/content";
import { formatDate } from "../../lib/utils";
import { ScrollReveal } from "../animation/ScrollReveal";
import { Tag } from "../ui/Tag";

export function EventCard({ event, index = 0 }: { event: EventItem; index?: number }) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="group border border-line p-6 transition-colors hover:border-ember/40 md:p-8">
        <div className="flex items-center justify-between">
          <Tag tone={event.status === "upcoming" ? "ember" : "mist"}>
            {event.status === "upcoming" ? "Upcoming" : "Past"}
          </Tag>
          <Tag>{event.category}</Tag>
        </div>
        <h3 className="mt-5 font-display text-2xl text-paper">{event.title}</h3>
        <p className="mt-3 text-mist">{event.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          <span className="flex items-center gap-2">
            <Calendar size={15} /> {formatDate(event.date)} &middot; {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={15} /> {event.location}
          </span>
        </div>
        {event.sample && <p className="mt-4 text-xs text-mist/70">Sample listing &mdash; final schedule to be confirmed.</p>}
      </div>
    </ScrollReveal>
  );
}
