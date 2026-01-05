# Events Management Guide

This folder contains the events data for both Yashika and Ryuu taiko groups.

## File Structure

```
data/
└── events.json     # All events for both groups
```

## How to Update Events

### Adding a New Event

1. Open `events.json`
2. Add a new event object to the `events` array
3. Follow this template:

```json
{
  "id": "unique-id-here",
  "group": "yashika",
  "title": "Event Title",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "venue": "Venue Name",
  "location": "City, Country",
  "description": "Event description here.",
  "ticketLink": "https://your-ticket-link.com",
  "price": "¥3,000",
  "status": "upcoming"
}
```

### Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier (use kebab-case) | `"ysk-2026-summer"` |
| `group` | string | Either `"yashika"` or `"ryuu"` | `"yashika"` |
| `title` | string | Event name | `"Summer Taiko Festival"` |
| `date` | string | ISO date format (YYYY-MM-DD) | `"2026-07-15"` |
| `time` | string | Event start time (24h format) | `"19:00"` |
| `venue` | string | Venue/location name | `"Tokyo Cultural Hall"` |
| `location` | string | City and country | `"Tokyo, Japan"` |
| `description` | string | Brief event description | `"Join us for..."` |
| `ticketLink` | string | Full URL to ticket page | `"https://..."` |
| `price` | string | Price or "Free" | `"¥3,000"` or `"Free"` |
| `status` | string | Either `"upcoming"` or `"past"` | `"upcoming"` |

### Updating an Existing Event

1. Find the event by its `id`
2. Update any fields as needed
3. Save the file

### Marking an Event as Past

Change the `status` field from `"upcoming"` to `"past"`:

```json
{
  "id": "ysk-2026-summer",
  "status": "past"
}
```

Past events will not be displayed on the landing page.

### Removing an Event

Simply delete the entire event object from the array.

## Important Notes

- ✅ Always use valid JSON syntax (check with a JSON validator if unsure)
- ✅ Events are automatically sorted by date (oldest first)
- ✅ Only "upcoming" events are displayed on the landing page
- ✅ Each group (yashika/ryuu) only sees their own events
- ✅ Date format must be YYYY-MM-DD for proper sorting
- ⚠️ After updating, you need to deploy the changes for them to appear live

## Tips

### For Free Events
Set `price` to `"Free"` and the button will say "Register Now" instead of "Get Tickets"

### ID Naming Convention
Use the format: `{group}-{year}-{keyword}`
- Examples: `ysk-2026-summer`, `ryuu-2026-dragon`, `ysk-2026-workshop`

### Ticket Links
- For events with tickets: Use the actual ticket purchase URL
- For free events: Link to a registration form or RSVP page
- For TBD: Use a placeholder like `"#"` or the contact email

## Example: Complete Event Entry

```json
{
  "id": "ysk-2026-autumn-spectacular",
  "group": "yashika",
  "title": "Autumn Spectacular",
  "date": "2026-10-15",
  "time": "18:30",
  "venue": "National Theatre",
  "location": "Tokyo, Japan",
  "description": "Experience the power and beauty of traditional taiko drumming in this special autumn performance featuring both classic and contemporary pieces.",
  "ticketLink": "https://tickets.example.com/yashika-autumn-2026",
  "price": "¥3,500",
  "status": "upcoming"
}
```

## Troubleshooting

### Events not showing up?
1. Check that `status` is set to `"upcoming"`
2. Verify the `group` matches (`"yashika"` or `"ryuu"`)
3. Ensure the `date` is in the future
4. Validate your JSON syntax

### JSON Validation Error?
- Check for missing commas between objects
- Ensure all strings use double quotes `""`
- Verify no trailing commas in arrays or objects
- Use [jsonlint.com](https://jsonlint.com) to validate

## Future Enhancements

This JSON file system can be easily migrated to:
- Google Sheets (for easier editing)
- Headless CMS (for rich editing interface)
- Database backend (for dynamic updates)

The event structure will remain the same, making migration straightforward.

