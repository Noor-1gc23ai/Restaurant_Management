import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "The Nova Table-theme";

const ThemeContext = createContext({
	theme: "night",
	isDay: false,
	isNight: true,
	toggleTheme: () => {},
	setTheme: () => {},
});

const getSystemTheme = () => {
	if (typeof window === "undefined" || !window.matchMedia) {
		return "night";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
};

const getInitialTheme = () => {
	if (typeof window === "undefined") {
		return "night";
	}

	try {
		const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
		if (storedTheme === "day" || storedTheme === "night") {
			return storedTheme;
		}
	} catch {
		// Ignore localStorage access failures and fall back to the system theme.
	}

	return getSystemTheme();
};

const applyThemeToDocument = (theme) => {
	if (typeof document === "undefined") {
		return;
	}

	const root = document.documentElement;
	root.dataset.theme = theme;
	root.classList.toggle("light", theme === "day");
	root.classList.toggle("dark", theme === "night");
	root.style.colorScheme = theme === "day" ? "light" : "dark";
};

export const ThemeProvider = ({ children }) => {
	const [theme, setThemeState] = useState(getInitialTheme);

	useEffect(() => {
		applyThemeToDocument(theme);

		try {
			window.localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch {
			// Keep the in-memory theme working even if storage is unavailable.
		}
	}, [theme]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleSystemThemeChange = (event) => {
			try {
				const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
				if (storedTheme !== "day" && storedTheme !== "night") {
					setThemeState(event.matches ? "night" : "day");
				}
			} catch {
				setThemeState(event.matches ? "night" : "day");
			}
		};

		mediaQuery.addEventListener?.("change", handleSystemThemeChange);
		return () => mediaQuery.removeEventListener?.("change", handleSystemThemeChange);
	}, []);

	const setTheme = (nextTheme) => {
		setThemeState(nextTheme === "day" ? "day" : "night");
	};

	const toggleTheme = () => {
		setThemeState((currentTheme) => (currentTheme === "day" ? "night" : "day"));
	};

	const value = useMemo(
		() => ({
			theme,
			isDay: theme === "day",
			isNight: theme === "night",
			toggleTheme,
			setTheme,
		}),
		[theme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

