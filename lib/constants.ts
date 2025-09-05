export const LANGUAGES = {
  en: 'English',
  es: 'Español',
} as const;

export const RIGHTS_CATEGORIES = {
  'traffic-stop': 'Traffic Stop',
  'arrest': 'Arrest',
  'search': 'Search',
  'general': 'General Rights',
} as const;

export const EMERGENCY_ALERT_MESSAGE = {
  en: "🚨 EMERGENCY ALERT: I am currently in a situation that requires documentation. My location and time are included. Please monitor this situation.",
  es: "🚨 ALERTA DE EMERGENCIA: Actualmente estoy en una situación que requiere documentación. Mi ubicación y hora están incluidas. Por favor monitorea esta situación.",
};

export const BASIC_RIGHTS = {
  en: {
    title: "Your Basic Rights",
    rights: [
      "You have the right to remain silent",
      "You have the right to refuse searches",
      "You have the right to ask if you are free to leave",
      "You have the right to an attorney",
      "You have the right to record interactions",
    ],
    scripts: {
      silence: "I am exercising my right to remain silent. I want to speak to a lawyer.",
      search: "I do not consent to any searches.",
      leaving: "Am I free to leave?",
      attorney: "I want to speak to an attorney before answering any questions.",
    }
  },
  es: {
    title: "Sus Derechos Básicos",
    rights: [
      "Tiene derecho a permanecer en silencio",
      "Tiene derecho a rechazar registros",
      "Tiene derecho a preguntar si puede irse",
      "Tiene derecho a un abogado",
      "Tiene derecho a grabar interacciones",
    ],
    scripts: {
      silence: "Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado.",
      search: "No consiento ningún registro.",
      leaving: "¿Soy libre de irme?",
      attorney: "Quiero hablar con un abogado antes de responder cualquier pregunta.",
    }
  }
};
