"use client";

export default function FeatureCard({ title, desc }) {
  return (
    <div className="feature-card">
      

      {/* center title (like "Main Title") */}
      <div className="feature-card-title">{title}</div>

     

      {/* three coloured “circles” (boxes) */}
      {/* back two are just shapes */}
      <div className="feature-card-box feature-card-box2" />
      <div className="feature-card-box feature-card-box1" />

      {/* top box with content (this is box3 in your code) */}
      <div className="feature-card-box feature-card-box3">
        <div className="feature-card-box-content">
          <span className="feature-card-box-title">{title}</span>
          <span className="feature-card-box-text">{desc}</span>
        </div>
      </div>
    </div>
  );
}
