import { RequiredInput } from "../interfaces/requireInput";

export const PROFILE_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "file",
    name: "avatar",
    className: "form-control",
    required: true,
    label: "label.profilePicture",
  },
  {
    type: "text",
    name: "phoneNumber",
    className: "form-control",
    required: true,
    label: "label.phoneNumber",
  },
  {
    type: "select",
    name: "gender",
    className: "form-control",
    required: true,
    label: "label.gender",
    options: [
      { value: "male", name: "Male" },
      { value: "female", name: "Female" },
      { value: "other", name: "Other" },
    ],
  },
  {
    type: "text",
    name: "street",
    className: "form-control",
    required: true,
    label: "label.street",
  },
  {
    type: "text",
    name: "street2",
    className: "form-control",
    label: "label.street2",
    required: false,
  },
  {
    type: "text",
    name: "city",
    className: "form-control",
    required: true,
    label: "label.city",
  },
  {
    type: "select",
    name: "country",
    className: "form-control",
    required: true,
    label: "label.country",
    options: [
      { value: "Afghanistan", name: "AF", flag: "🇦🇫" },
      { value: "Argentina", name: "AR", flag: "🇦🇷" },
      { value: "Australia", name: "AU", flag: "🇦🇺" },
      { value: "Austria", name: "AT", flag: "🇦🇹" },
      { value: "Bangladesh", name: "BD", flag: "🇧🇩" },
      { value: "Belgium", name: "BE", flag: "🇧🇪" },
      { value: "Brazil", name: "BR", flag: "🇧🇷" },
      { value: "Canada", name: "CA", flag: "🇨🇦" },
      { value: "China", name: "CN", flag: "🇨🇳" },
      { value: "Denmark", name: "DK", flag: "🇩🇰" },
      { value: "Egypt", name: "EG", flag: "🇪🇬" },
      { value: "France", name: "FR", flag: "🇫🇷" },
      { value: "Germany", name: "DE", flag: "🇩🇪" },
      { value: "Greece", name: "GR", flag: "🇬🇷" },
      { value: "India", name: "IN", flag: "🇮🇳" },
      { value: "Indonesia", name: "ID", flag: "🇮🇩" },
      { value: "Iran", name: "IR", flag: "🇮🇷" },
      { value: "Iraq", name: "IQ", flag: "🇮🇶" },
      { value: "Ireland", name: "IE", flag: "🇮🇪" },
      { value: "Israel", name: "IL", flag: "🇮🇱" },
      { value: "Italy", name: "IT", flag: "🇮🇹" },
      { value: "Japan", name: "JP", flag: "🇯🇵" },
      { value: "Korea Republic", name: "KR", flag: "🇰🇷" },
      { value: "Mexico", name: "MX", flag: "🇲🇽" },
      { value: "Netherlands", name: "NL", flag: "🇳🇱" },
      { value: "New Zealand", name: "NZ", flag: "🇳🇿" },
      { value: "Norway", name: "NO", flag: "🇳🇴" },
      { value: "Poland", name: "PL", flag: "🇵🇱" },
      { value: "Portugal", name: "PT", flag: "🇵🇹" },
      { value: "Qatar", name: "QA", flag: "🇶🇦" },
      { value: "Romania", name: "RO", flag: "🇷🇴" },
      { value: "Russian Federation", name: "RU", flag: "🇷🇺" },
      { value: "Singapore", name: "SG", flag: "🇸🇬" },
      { value: "South Africa", name: "ZA", flag: "🇿🇦" },
      { value: "Spain", name: "ES", flag: "🇪🇸" },
      { value: "Sweden", name: "SE", flag: "🇸🇪" },
      { value: "Switzerland", name: "CH", flag: "🇨🇭" },
      { value: "Turkey", name: "TR", flag: "🇹🇷" },
      { value: "Ukraine", name: "UA", flag: "🇺🇦" },
      { value: "United Arab Emirates", name: "AE", flag: "🇦🇪" },
      { value: "United Kingdom", name: "GB", flag: "🇬🇧" },
      { value: "United States", name: "US", flag: "🇺🇸" },
      { value: "Vietnam", name: "VN", flag: "🇻🇳" },
    ],
  },
  {
    type: "number",
    name: "zipCode",
    className: "form-control",
    required: true,
    label: "label.zipCode",
  },
  {
    type: "select",
    name: "language",
    className: "form-control",
    required: true,
    label: "label.language",
    options: [
      { name: "af", value: "Afrikaans", flag: "🇿🇦" },
      { name: "en-AU", value: "English (Australia)", flag: "🇦🇺" },
      { name: "en-CA", value: "English (Canada)", flag: "🇨🇦" },
      { name: "en-GB", value: "English (United Kingdom)", flag: "🇬🇧" },
      { name: "en", value: "English", flag: "🇺🇸" },
      { name: "eu", value: "Euskara", flag: "🇪🇸" },
      { name: "bg", value: "Български", flag: "🇧🇬" },
      { name: "be", value: "Беларуская", flag: "🇧🇾" },
      { name: "hr", value: "Hrvatski", flag: "🇭🇷" },
      { name: "da", value: "Dansk", flag: "🇩🇰" },
      { name: "et", value: "Eesti", flag: "🇪🇪" },
      { name: "fr-FR", value: "Français (France)", flag: "🇫🇷" },
      { name: "fr-CA", value: "Français (Canada)", flag: "🇨🇦" },
      { name: "gl", value: "Galego", flag: "🇪🇸" },
      { name: "id", value: "Indonesia", flag: "🇮🇩" },
      { name: "is", value: "Íslenska", flag: "🇮🇸" },
      { name: "it", value: "Italiano", flag: "🇮🇹" },
      { name: "ja", value: "日本語", flag: "🇯🇵" },
      { name: "ca", value: "Català", flag: "🇪🇸" },
      { name: "kk", value: "Қазақ тілі", flag: "🇰🇿" },
      { name: "ko", value: "한국어", flag: "🇰🇷" },
      { name: "ky", value: "Кыргызча", flag: "🇰🇬" },
      { name: "lt", value: "Lietuvių", flag: "🇱🇹" },
      { name: "lv", value: "Latviešu", flag: "🇱🇻" },
      { name: "hu", value: "Magyar", flag: "🇭🇺" },
      { name: "mn", value: "Монгол", flag: "🇲🇳" },
      { name: "nl", value: "Nederlands", flag: "🇳🇱" },
      { name: "no", value: "Norsk", flag: "🇳🇴" },
      { name: "de", value: "Deutsch", flag: "🇩🇪" },
      { name: "pl", value: "Polski", flag: "🇵🇱" },
      { name: "pt-BR", value: "Português (Brasil)", flag: "🇧🇷" },
      { name: "pt-PT", value: "Português (Portugal)", flag: "🇵🇹" },
      { name: "ro", value: "Română", flag: "🇷🇴" },
      { name: "ru", value: "Русский", flag: "🇷🇺" },
      { name: "rm", value: "Rumantsch", flag: "🇨🇭" },
      { name: "sk", value: "Slovenčina", flag: "🇸🇰" },
      { name: "sl", value: "Slovenščina", flag: "🇸🇮" },
      { name: "sr", value: "Српски", flag: "🇷🇸" },
      { name: "tr", value: "Türkçe", flag: "🇹🇷" },
      { name: "uk", value: "Українська", flag: "🇺🇦" },
      { name: "az", value: "Azərbaycan dili", flag: "🇦🇿" },
      { name: "cs", value: "Čeština", flag: "🇨🇿" },
      { name: "el", value: "Ελληνικά", flag: "🇬🇷" },
      { name: "es-US", value: "Español (Estados Unidos)", flag: "🇺🇸" },
      { name: "es", value: "Español (España)", flag: "🇪🇸" },
      { name: "sv", value: "Svenska", flag: "🇸🇪" },
    ],
  },
  {
    type: "select",
    name: "timeZone",
    className: "form-control",
    required: true,
    label: "label.timeZone",
    options: [
      {
        value: "Pacific/Midway (GMT-11:00)",
        name: "Midway Island",
      },
      {
        value: "US/Hawaii (GMT-10:00)",
        name: "Hawaii",
      },
      {
        value: "US/Alaska (GMT-09:00)",
        name: "Alaska",
      },
      {
        value: "US/Pacific (GMT-08:00)",
        name: "Pacific Time (US & Canada)",
      },
      {
        value: "US/Mountain (GMT-07:00)",
        name: "Mountain Time (US & Canada)",
      },
      {
        value: "America/Mexico_City (GMT-06:00)",
        name: "Mexico City",
      },
      {
        value: "US/Eastern (GMT-05:00)",
        name: "Eastern Time (US & Canada)",
      },
      {
        value: "America/Caracas (GMT-04:30)",
        name: "Caracas",
      },
      {
        value: "Canada/Atlantic (GMT-04:00)",
        name: "Atlantic Time (Canada)",
      },
      {
        value: "America/Buenos_Aires (GMT-03:00)",
        name: "Buenos Aires",
      },
      {
        value: "Atlantic/Stanley (GMT-02:00)",
        name: "Stanley",
      },
      {
        value: "Atlantic/Azores (GMT-01:00)",
        name: "Azores",
      },
      {
        value: "Europe/London (GMT)",
        name: "London",
      },
      {
        value: "Europe/Paris (GMT+01:00)",
        name: "Paris",
      },
      {
        value: "Europe/Athens (GMT+02:00)",
        name: "Athens",
      },
      {
        value: "Asia/Baghdad (GMT+03:00)",
        name: "Baghdad",
      },
      {
        value: "Asia/Tehran (GMT+03:30)",
        name: "Tehran",
      },
      {
        value: "Europe/Moscow (GMT+04:00)",
        name: "Moscow",
      },
      {
        value: "Asia/Kabul (GMT+04:30)",
        name: "Kabul",
      },
      {
        value: "Asia/Karachi (GMT+05:00)",
        name: "Karachi",
      },
      {
        value: "Asia/Kolkata (GMT+05:30)",
        name: "Kolkata",
      },
      {
        value: "Asia/Kathmandu (GMT+05:45)",
        name: "Kathmandu",
      },
      {
        value: "Asia/Dhaka (GMT+06:00)",
        name: "Dhaka",
      },
      {
        value: "Asia/Novosibirsk (GMT+07:00)",
        name: "Novosibirsk",
      },
      {
        value: "Asia/Hong_Kong (GMT+08:00)",
        name: "Hong Kong",
      },
      {
        value: "Asia/Tokyo (GMT+09:00)",
        name: "Tokyo",
      },
      {
        value: "Australia/Adelaide (GMT+09:30)",
        name: "Adelaide",
      },
      {
        value: "Asia/Yakutsk (GMT+10:00)",
        name: "Yakutsk",
      },
      {
        value: "Asia/Vladivostok (GMT+11:00)",
        name: "Vladivostok",
      },
      {
        value: "Pacific/Fiji (GMT+12:00)",
        name: "Fiji",
      },
    ],
  },
];
