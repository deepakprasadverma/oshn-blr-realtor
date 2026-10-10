export default function ChatButton() {
  return (
    <a
      href="https://wa.me/919448567426"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all z-40 border-2 border-slate-900"
    >
      💬
    </a>
  );
}