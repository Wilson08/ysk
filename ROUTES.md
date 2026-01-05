# Routes Reference

This document describes all available routes in the application.

## Available Routes

### Home Page
- **URL:** `/`
- **Description:** Yin-Yang selection page where users choose between Yashika (blue) or Ryuu (red)
- **Features:** Interactive yin-yang circle with theme selection

---

### Landing Pages

#### Generic Landing (redirects to Yashika)
- **URL:** `/landing`
- **Description:** Defaults to Yashika if no group is specified
- **Use Case:** Legacy support, direct access without selection

#### Yashika Landing Page
- **URL:** `/landing/yashika`
- **Description:** Direct access to Yashika (blue team) landing page
- **Features:**
  - Hero section with team photo
  - About section
  - Social media links
  - Photo gallery
  - Upcoming events (filtered for Yashika only)
  - Booking CTA

#### Ryuu Landing Page
- **URL:** `/landing/ryuu`
- **Description:** Direct access to Ryuu (red team) landing page
- **Features:**
  - Hero section with team photo
  - About section
  - Social media links
  - Photo gallery
  - Upcoming events (filtered for Ryuu only)
  - Booking CTA

---

## Route Parameters

### Landing Page Route
```
/landing/:group
```

**Parameter:**
- `group` (optional): Either `"yashika"` or `"ryuu"`
- If not provided, defaults to `"yashika"`

---

## Navigation Flow

### From Home Page
```
/ → [User clicks yin-yang] → /landing/yashika or /landing/ryuu
```

### Direct Access
Users can bookmark and share direct links:
- Share Yashika: `https://yoursite.com/landing/yashika`
- Share Ryuu: `https://yoursite.com/landing/ryuu`

### Back Navigation
All landing pages have a "Back to Selection" button that returns to `/`

---

## Benefits of Direct Routes

✅ **Bookmarkable** - Users can save their favorite group's page  
✅ **Shareable** - Easy to share specific group links on social media  
✅ **SEO-Friendly** - Each group has its own URL for better search indexing  
✅ **Deep Linking** - Can link directly from external sites  
✅ **User-Friendly** - Clear, readable URLs  

---

## Examples

### Social Media Sharing
```
Instagram Bio: "Learn more about us at yoursite.com/landing/yashika"
```

### Email Marketing
```
"Click here to see our upcoming events: yoursite.com/landing/ryuu"
```

### QR Codes
Create separate QR codes for each group pointing to:
- Yashika: `/landing/yashika`
- Ryuu: `/landing/ryuu`

---

## Technical Implementation

### Route Definition (routes.ts)
```typescript
route("landing/:group", "routes/landing.tsx")
```

### Parameter Access (landing.tsx)
```typescript
const params = useParams();
const group = params.group as "yashika" | "ryuu" | undefined;
```

### Priority Order
1. URL parameter (`/landing/ryuu`)
2. Navigation state (from home page selection)
3. Default fallback (`yashika`)

---

## Future Enhancements

Possible additions:
- `/landing/yashika/events` - Dedicated events page
- `/landing/yashika/gallery` - Expanded gallery
- `/landing/yashika/about` - Detailed about page
- `/landing/yashika/contact` - Contact form

