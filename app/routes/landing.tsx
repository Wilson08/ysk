import { useLocation, Link, useParams } from "react-router";
import type { Route } from "./+types/landing";
import { useState, useEffect } from "react";

// Import group images
import yashikaHero from "../../assets/ysk-background.jpg";
import ryuuHero from "../../assets/ryuu-background.jpg";
import yashikaPortrait from "../../assets/blue.jpg";
import ryuuPortrait from "../../assets/red.jpg";

// Import events data
import eventsData from "../../data/events.json";

interface LocationState {
  group?: "yashika" | "ryuu";
}

interface Event {
  id: string;
  group: "yashika" | "ryuu";
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  ticketLink: string;
  price: string;
  status: "upcoming" | "past";
}

export function meta({ params }: Route.MetaArgs) {
  const group = (params as { group?: string })?.group as "yashika" | "ryuu" | undefined;
  const groupName = group === "ryuu" ? "Ryuu" : "Yashika";
  
  return [
    { title: `${groupName} - Taiko Drumming Group` },
    { name: "description", content: `${groupName} brings traditional Japanese taiko drumming with powerful rhythms and graceful choreography.` },
  ];
}

export default function Landing() {
  const location = useLocation();
  const params = useParams();
  const state = location.state as LocationState;
  
  // Get group from URL parameter first, then from state, then default to yashika
  const urlGroup = params.group as "yashika" | "ryuu" | undefined;
  const stateGroup = state?.group;
  const group = urlGroup || stateGroup || "yashika";

  const isYashika = group === "yashika";
  const groupName = isYashika ? "Yashika" : "Ryuu";
  const colorTheme = isYashika ? "blue" : "red";

  // Filter events for current group and upcoming only
  const allEvents = eventsData.events as Event[];
  const upcomingEvents = allEvents
    .filter((event) => event.group === group && event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Group-specific images
  const groupImages = {
    yashika: {
      hero: yashikaHero,
      gallery: [yashikaHero, yashikaPortrait, yashikaHero, yashikaPortrait],
    },
    ryuu: {
      hero: ryuuHero,
      gallery: [ryuuHero, ryuuPortrait, ryuuHero, ryuuPortrait],
    },
  };

  const images = groupImages[group];

  // Group-specific content
  const content = {
    yashika: {
      tagline: "Thunder and Precision",
      about:
        "Yashika brings together traditional Japanese taiko drumming with modern energy. Our ensemble combines powerful rhythms with graceful choreography, creating performances that resonate with audiences worldwide.",
      specialty: "Traditional Wadaiko & Contemporary Fusion",
      social: {
        instagram: "https://www.instagram.com/yashikadaiko/",
        youtube: "https://www.youtube.com/@yashikadaiko",
      },
    },
    ryuu: {
      tagline: "Dragon's Heartbeat",
      about:
        "Ryuu embodies the spirit of the dragon through thunderous taiko performances. With roots in ancient traditions and eyes toward the future, we channel raw power and spiritual depth into every beat.",
      specialty: "High-Energy Performance & Traditional Kumi-Daiko",
      social: {
        instagram: "https://instagram.com/ryuu_taiko",
        youtube: "https://youtube.com/@ryuu_taiko",
      },
    },
  };

  const groupContent = content[group];

  return (
    <div className={`landing-page landing-${colorTheme}`}>
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">{groupName}</h1>
          <p className="hero-tagline">{groupContent.tagline}</p>
        </div>
        <div className="hero-image">
          <img 
            src={images.hero} 
            alt={`${groupName} taiko drumming group performance`}
            className="hero-photo"
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="landing-events">
        <h2>Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3 className="event-title">{event.title}</h3>
                  <span className="event-price">{event.price}</span>
                </div>
                <div className="event-details">
                  <div className="event-detail">
                    <svg className="event-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
                    </svg>
                    <span>{formatDate(event.date)} • {event.time}</span>
                  </div>
                  <div className="event-detail">
                    <svg className="event-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <a 
                  href={event.ticketLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-ticket-button"
                >
                  {event.price === "Free" ? "Register Now" : "Get Tickets"}
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>No upcoming events scheduled at the moment.</p>
            <p>Check back soon or follow us on social media for announcements!</p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="landing-about">
        <h2>About Us</h2>
        <p className="about-text">{groupContent.about}</p>
        <p className="about-specialty">
          <strong>Specialty:</strong> {groupContent.specialty}
        </p>
      </section>

      {/* Photo Gallery */}
      <section className="landing-gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {images.gallery.map((img, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={img} 
                alt={`${groupName} performance photo ${index + 1}`}
                className="gallery-photo"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="landing-social">
        <h2>Connect With Us</h2>
        <div className="social-links">
          <a
            href={groupContent.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href={groupContent.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <section className="landing-cta">
        <h2>Book Us For Your Event</h2>
        <p>Bring the power of taiko to your venue</p>
        <a href={`mailto:booking@${group}.com`} className="cta-button">
          Contact Us
        </a>
      </section>

      {/* Back Button */}
      <Link to="/" className="back-button">
        ← Back to Selection
      </Link>
    </div>
  );
}

