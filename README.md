# Know-Your-Rights Cards

A Base MiniApp providing instant, actionable legal guidance and documentation tools for individuals interacting with law enforcement.

## Features

- **Mobile-Optimized Rights Guides**: One-page, easy-to-read guides detailing user rights
- **Bilingual Support**: Available in English and Spanish
- **Quick Record & Alert**: One-tap recording with emergency contact notifications
- **Shareable Content Generation**: Create and share rights information cards
- **Emergency Contact Management**: Manage trusted contacts for alerts

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety
- **MiniKit**: Base Wallet integration

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Core Components

### Rights Guide
- Essential legal rights information
- State-specific guidance
- "What to say" scripts in both languages
- Audio playback for scripts

### Recording & Alert System
- Audio recording with visual indicators
- Automatic emergency contact notifications
- Location-based alerts
- Secure storage integration

### Shareable Cards
- AI-generated content summaries
- Incident documentation
- Social sharing capabilities
- Blockchain verification (planned)

### Emergency Contacts
- Contact management interface
- Multi-contact alert system
- Phone and email support

## Design System

The app uses a custom design system with:
- **Colors**: Purple/blue gradient theme with glass morphism
- **Typography**: Clean, readable fonts optimized for mobile
- **Components**: Modular, reusable UI components
- **Motion**: Smooth transitions and micro-interactions

## Base MiniApp Integration

This app is built as a Base MiniApp using:
- MiniKitProvider for wallet integration
- OnchainKit components for identity and wallet features
- Base blockchain for potential on-chain verification
- Optimized for Farcaster frames

## Development

### File Structure
```
app/                 # Next.js App Router pages
components/          # Reusable UI components
lib/                # Utilities, types, and constants
public/             # Static assets
```

### Key Technologies
- **MiniKit**: Base Wallet integration
- **OnchainKit**: Blockchain components
- **Tailwind CSS**: Styling and responsive design
- **TypeScript**: Type safety
- **Lucide React**: Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.
