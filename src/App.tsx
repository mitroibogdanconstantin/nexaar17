import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ListingDetailPage from "./pages/ListingDetailPage";
import CreateListingPage from "./pages/CreateListingPage";
import EditListingPage from "./pages/EditListingPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import FixSupabasePage from "./pages/FixSupabasePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PasswordResetPage from "./pages/PasswordResetPage";

// Scroll to top on route change
function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

// Hook care detectează când utilizatorul revine în tab și reîncarcă datele
function useAppVisibility() {
	useEffect(() => {
		// Variabilă pentru a ține evidența timpului petrecut în afara tabului
		let tabInactiveTime = 0;
		let tabSwitchTime = 0;
		
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				// Salvăm momentul când utilizatorul a părăsit tabul
				tabSwitchTime = Date.now();
			} else if (document.visibilityState === "visible") {
				// Calculăm cât timp a fost utilizatorul plecat
				if (tabSwitchTime > 0) {
					tabInactiveTime = Date.now() - tabSwitchTime;
					
					// Reîncărcăm pagina doar dacă utilizatorul a fost plecat mai mult de 5 minute
					// Acest lucru evită reîncărcările frecvente pentru schimbări rapide între taburi
					if (tabInactiveTime > 5 * 60 * 1000) {
						console.log("Reîncărcare pagină după inactivitate de peste 5 minute");
						window.location.reload();
					}
				}
			}
		};

		const handleFocus = () => {
			// Verificăm dacă a trecut suficient timp de la ultima activitate
			if (tabSwitchTime > 0) {
				const inactiveTime = Date.now() - tabSwitchTime;
				if (inactiveTime > 5 * 60 * 1000) {
					console.log("Reîncărcare pagină după inactivitate de peste 5 minute");
					window.location.reload();
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("focus", handleFocus);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("focus", handleFocus);
		};
	}, []);
}

function App() {
	useAppVisibility(); // activează logica de reload

	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<ScrollToTop />
			<div className="min-h-screen bg-nexar-light flex flex-col">
				<Header />
				<main className="flex-1">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/anunt/:id" element={<ListingDetailPage />} />
						<Route path="/adauga-anunt" element={<CreateListingPage />} />
						<Route path="/editeaza-anunt/:id" element={<EditListingPage />} />
						<Route path="/profil" element={<ProfilePage />} />
						<Route path="/profil/:id" element={<ProfilePage />} />
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/auth" element={<AuthPage />} />
						<Route
							path="/auth/reset-password"
							element={<PasswordResetPage />}
						/>
						<Route path="/despre" element={<AboutPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/termeni" element={<TermsPage />} />
						<Route path="/confidentialitate" element={<PrivacyPage />} />
						<Route path="/cookies" element={<CookiesPage />} />
						<Route path="/fix-supabase" element={<FixSupabasePage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;