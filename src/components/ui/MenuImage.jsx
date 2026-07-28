const MENU_IMAGE_FALLBACK =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23111827'/%3E%3Cpath d='M170 410l140-150 120 120 70-80 130 110' fill='none' stroke='%23374151' stroke-width='20' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='290' cy='230' r='36' fill='%23374151'/%3E%3Ctext x='50%25' y='88%25' fill='%239CA3AF' font-family='Arial, sans-serif' font-size='28' text-anchor='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

const MenuImage = ({ src, alt, className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = MENU_IMAGE_FALLBACK;
      }}
    />
  );
};

export default MenuImage;