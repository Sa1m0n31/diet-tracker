--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: check_number_of_activities_added_by_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_number_of_activities_added_by_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	activities_added int;
BEGIN
	SELECT COUNT(*) INTO activities_added FROM aktywnosci_fizyczne JOIN sport ON sport.id = aktywnosci_fizyczne.id_sportu 
	WHERE aktywnosci_fizyczne.id_uzytkownika = 28 AND sport.data = NOW()::date;
	IF activities_added >= 5 THEN
		RETURN NULL;
	ELSE
		RETURN NEW;
	END IF;
END
$$;


ALTER FUNCTION public.check_number_of_activities_added_by_user() OWNER TO postgres;

--
-- Name: check_number_of_meals_added_by_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_number_of_meals_added_by_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	meals_added int;
	test text;
BEGIN
	SELECT COUNT(*) INTO meals_added FROM spozycie WHERE id_uzytkownika = NEW.id_uzytkownika AND data = NOW()::date;
	IF meals_added >= 10 THEN
		RAISE NOTICE '%', meals_added;
		RETURN NULL;
	ELSE
		RAISE NOTICE 'else %', meals_added;
		RETURN NEW;
	END IF;
END
$$;


ALTER FUNCTION public.check_number_of_meals_added_by_user() OWNER TO postgres;

--
-- Name: find_similar_product(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.find_similar_product() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
   arrow record;
   similarities int;
BEGIN
	FOR arrow IN
		SELECT w.kilokalorie, w.tluszcze, w.weglowodany, w.cukry, w.bialka, w.sole, w.blonnik, m.magnez, m.potas, m.wapn, m.chlor, m.fosfor FROM wartosci_odzywcze w
		JOIN makroelementy m USING(id_produktu)
	LOOP
		similarities = 0;
		IF NEW.kilokalorie = arrow.kilokalorie THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.tluszcze = arrow.tluszcze THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.weglowodany = arrow.weglowodany THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.cukry = arrow.cukry THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.bialka = arrow.bialka THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.sole = arrow.sole THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.blonnik = arrow.blonnik THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.magnez = arrow.magnez THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.potas = arrow.potas THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.fosfor = arrow.fosfor THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.chlor = arrow.chlor THEN
			similarities := similarities + 1;
		END IF;
		IF NEW.wapn = arrow.wapn THEN
			similarities := similarities + 1;
		END IF;

		IF similarities > 10 THEN
			RETURN NULL;
		END IF;
	END LOOP;
	
	RETURN NEW;
END
$$;


ALTER FUNCTION public.find_similar_product() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admini; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admini (
    id integer NOT NULL,
    login character varying(16) NOT NULL,
    haslo character varying(256) NOT NULL
);


ALTER TABLE public.admini OWNER TO postgres;

--
-- Name: aktywnosci_fizyczne_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aktywnosci_fizyczne_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aktywnosci_fizyczne_autoincrement OWNER TO postgres;

--
-- Name: aktywnosci_fizyczne; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aktywnosci_fizyczne (
    id integer DEFAULT nextval('public.aktywnosci_fizyczne_autoincrement'::regclass) NOT NULL,
    id_uzytkownika integer NOT NULL,
    id_sportu integer NOT NULL
);


ALTER TABLE public.aktywnosci_fizyczne OWNER TO postgres;

--
-- Name: dyscypliny_sportu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dyscypliny_sportu (
    id integer NOT NULL,
    nazwa character varying(64) NOT NULL
);


ALTER TABLE public.dyscypliny_sportu OWNER TO postgres;

--
-- Name: makroelementy_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.makroelementy_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.makroelementy_autoincrement OWNER TO postgres;

--
-- Name: makroelementy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.makroelementy (
    id integer DEFAULT nextval('public.makroelementy_autoincrement'::regclass) NOT NULL,
    id_produktu integer NOT NULL,
    wapn double precision,
    chlor double precision,
    magnez double precision,
    fosfor double precision,
    potas double precision
);


ALTER TABLE public.makroelementy OWNER TO postgres;

--
-- Name: poczekalnia_produktow_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poczekalnia_produktow_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poczekalnia_produktow_autoincrement OWNER TO postgres;

--
-- Name: poczekalnia_produktow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poczekalnia_produktow (
    id integer DEFAULT nextval('public.poczekalnia_produktow_autoincrement'::regclass) NOT NULL,
    nazwa character varying(64) NOT NULL,
    kilokalorie integer,
    weglowodany double precision,
    tluszcze double precision,
    cukry double precision,
    sole double precision,
    blonnik double precision,
    magnez double precision,
    potas double precision,
    fosfor double precision,
    chlor double precision,
    wapn double precision,
    bialka integer,
    rodzaj character varying(32)
);


ALTER TABLE public.poczekalnia_produktow OWNER TO postgres;

--
-- Name: product_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_autoincrement OWNER TO postgres;

--
-- Name: produkty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produkty (
    id integer DEFAULT nextval('public.product_autoincrement'::regclass) NOT NULL,
    id_rodzaju integer,
    nazwa character varying(4000) NOT NULL
);


ALTER TABLE public.produkty OWNER TO postgres;

--
-- Name: rodzaje_produktow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rodzaje_produktow (
    id integer NOT NULL,
    nazwa character varying(32) NOT NULL
);


ALTER TABLE public.rodzaje_produktow OWNER TO postgres;

--
-- Name: sesje_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sesje_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sesje_autoincrement OWNER TO postgres;

--
-- Name: sesje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sesje (
    id integer DEFAULT nextval('public.sesje_autoincrement'::regclass) NOT NULL,
    klucz_sesji character varying(100) NOT NULL,
    data_wygasniecia_sesji timestamp without time zone NOT NULL,
    login character varying(30)
);


ALTER TABLE public.sesje OWNER TO postgres;

--
-- Name: sesje_adminow_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sesje_adminow_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sesje_adminow_autoincrement OWNER TO postgres;

--
-- Name: sesje_adminow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sesje_adminow (
    id integer DEFAULT nextval('public.sesje_adminow_autoincrement'::regclass) NOT NULL,
    klucz_sesji character varying(256) NOT NULL,
    data_wygasniecia_sesji timestamp without time zone NOT NULL
);


ALTER TABLE public.sesje_adminow OWNER TO postgres;

--
-- Name: sport_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sport_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sport_autoincrement OWNER TO postgres;

--
-- Name: sport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sport (
    id integer DEFAULT nextval('public.sport_autoincrement'::regclass) NOT NULL,
    id_dyscypliny integer NOT NULL,
    czas_trwania integer NOT NULL,
    data date
);


ALTER TABLE public.sport OWNER TO postgres;

--
-- Name: spozycie_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spozycie_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spozycie_autoincrement OWNER TO postgres;

--
-- Name: spozycie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spozycie (
    id integer DEFAULT nextval('public.spozycie_autoincrement'::regclass) NOT NULL,
    id_uzytkownika integer NOT NULL,
    id_produktu integer NOT NULL,
    data date NOT NULL,
    ilosc real NOT NULL
);


ALTER TABLE public.spozycie OWNER TO postgres;

--
-- Name: uzytkownicy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uzytkownicy (
    id integer NOT NULL,
    imie character varying(16),
    nazwisko character varying(16),
    wzrost integer,
    waga integer,
    plec character(1),
    email character varying(32) NOT NULL,
    login character varying(16) NOT NULL,
    haslo character varying(256) NOT NULL,
    data_rejestracji date NOT NULL
);


ALTER TABLE public.uzytkownicy OWNER TO postgres;

--
-- Name: uzytkownicy_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uzytkownicy_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uzytkownicy_autoincrement OWNER TO postgres;

--
-- Name: wartosci_odzywcze_autoincrement; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wartosci_odzywcze_autoincrement
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wartosci_odzywcze_autoincrement OWNER TO postgres;

--
-- Name: wartosci_odzywcze; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wartosci_odzywcze (
    id integer DEFAULT nextval('public.wartosci_odzywcze_autoincrement'::regclass) NOT NULL,
    id_produktu integer,
    kilokalorie integer,
    tluszcze double precision,
    weglowodany double precision,
    cukry double precision,
    bialka double precision,
    sole double precision,
    blonnik double precision
);


ALTER TABLE public.wartosci_odzywcze OWNER TO postgres;

--
-- Data for Name: admini; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admini (id, login, haslo) FROM stdin;
\.


--
-- Data for Name: aktywnosci_fizyczne; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aktywnosci_fizyczne (id, id_uzytkownika, id_sportu) FROM stdin;
\.


--
-- Data for Name: dyscypliny_sportu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dyscypliny_sportu (id, nazwa) FROM stdin;
\.


--
-- Data for Name: makroelementy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.makroelementy (id, id_produktu, wapn, chlor, magnez, fosfor, potas) FROM stdin;
\.


--
-- Data for Name: poczekalnia_produktow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.poczekalnia_produktow (id, nazwa, kilokalorie, weglowodany, tluszcze, cukry, sole, blonnik, magnez, potas, fosfor, chlor, wapn, bialka, rodzaj) FROM stdin;
\.


--
-- Data for Name: produkty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produkty (id, id_rodzaju, nazwa) FROM stdin;
\.


--
-- Data for Name: rodzaje_produktow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rodzaje_produktow (id, nazwa) FROM stdin;
\.


--
-- Data for Name: sesje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sesje (id, klucz_sesji, data_wygasniecia_sesji, login) FROM stdin;
\.


--
-- Data for Name: sesje_adminow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sesje_adminow (id, klucz_sesji, data_wygasniecia_sesji) FROM stdin;
\.


--
-- Data for Name: sport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sport (id, id_dyscypliny, czas_trwania, data) FROM stdin;
\.


--
-- Data for Name: spozycie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spozycie (id, id_uzytkownika, id_produktu, data, ilosc) FROM stdin;
\.


--
-- Data for Name: uzytkownicy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uzytkownicy (id, imie, nazwisko, wzrost, waga, plec, email, login, haslo, data_rejestracji) FROM stdin;
\.


--
-- Data for Name: wartosci_odzywcze; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wartosci_odzywcze (id, id_produktu, kilokalorie, tluszcze, weglowodany, cukry, bialka, sole, blonnik) FROM stdin;
\.


--
-- Name: aktywnosci_fizyczne_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aktywnosci_fizyczne_autoincrement', 23, true);


--
-- Name: makroelementy_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.makroelementy_autoincrement', 31, true);


--
-- Name: poczekalnia_produktow_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poczekalnia_produktow_autoincrement', 17, true);


--
-- Name: product_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_autoincrement', 96, true);


--
-- Name: sesje_adminow_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sesje_adminow_autoincrement', 17, true);


--
-- Name: sesje_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sesje_autoincrement', 82, true);


--
-- Name: sport_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sport_autoincrement', 32, true);


--
-- Name: spozycie_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spozycie_autoincrement', 71, true);


--
-- Name: uzytkownicy_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uzytkownicy_autoincrement', 31, true);


--
-- Name: wartosci_odzywcze_autoincrement; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wartosci_odzywcze_autoincrement', 35, true);


--
-- Name: admini admini_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admini
    ADD CONSTRAINT admini_pkey PRIMARY KEY (id);


--
-- Name: dyscypliny_sportu dyscypliny_sportu_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dyscypliny_sportu
    ADD CONSTRAINT dyscypliny_sportu_pk PRIMARY KEY (id);


--
-- Name: makroelementy makroelementy_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.makroelementy
    ADD CONSTRAINT makroelementy_pk PRIMARY KEY (id);


--
-- Name: poczekalnia_produktow poczekalnia_produktow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poczekalnia_produktow
    ADD CONSTRAINT poczekalnia_produktow_pkey PRIMARY KEY (id);


--
-- Name: produkty produkty_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produkty
    ADD CONSTRAINT produkty_pk PRIMARY KEY (id);


--
-- Name: spozycie relation_4_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spozycie
    ADD CONSTRAINT relation_4_pk PRIMARY KEY (id_uzytkownika, id_produktu, id);


--
-- Name: aktywnosci_fizyczne relation_6_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aktywnosci_fizyczne
    ADD CONSTRAINT relation_6_pk PRIMARY KEY (id_uzytkownika, id_sportu, id);


--
-- Name: rodzaje_produktow rodzaje_produktow_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rodzaje_produktow
    ADD CONSTRAINT rodzaje_produktow_pk PRIMARY KEY (id);


--
-- Name: sesje_adminow sesje-adminow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesje_adminow
    ADD CONSTRAINT "sesje-adminow_pkey" PRIMARY KEY (id);


--
-- Name: sesje sesje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesje
    ADD CONSTRAINT sesje_pkey PRIMARY KEY (id);


--
-- Name: sport sport_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sport
    ADD CONSTRAINT sport_pk PRIMARY KEY (id);


--
-- Name: uzytkownicy unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownicy
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: uzytkownicy unique_login; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownicy
    ADD CONSTRAINT unique_login UNIQUE (login);


--
-- Name: uzytkownicy uzytkownicy_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownicy
    ADD CONSTRAINT uzytkownicy_pk PRIMARY KEY (id);


--
-- Name: wartosci_odzywcze wartosci_odzywcze_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wartosci_odzywcze
    ADD CONSTRAINT wartosci_odzywcze_pk PRIMARY KEY (id);


--
-- Name: dane_logowania_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dane_logowania_index ON public.uzytkownicy USING btree (login, haslo);


--
-- Name: data_sportu_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX data_sportu_index ON public.sport USING btree (data);


--
-- Name: data_spozycia_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX data_spozycia_index ON public.spozycie USING btree (data);


--
-- Name: makroelementy__idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX makroelementy__idx ON public.makroelementy USING btree (id_produktu);


--
-- Name: nazwa_produktu_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nazwa_produktu_index ON public.produkty USING btree (nazwa);


--
-- Name: wartosci_odzywcze__idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX wartosci_odzywcze__idx ON public.wartosci_odzywcze USING btree (id_produktu);


--
-- Name: aktywnosci_fizyczne check_number_of_activities_added_today; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_number_of_activities_added_today BEFORE INSERT ON public.aktywnosci_fizyczne FOR EACH ROW EXECUTE FUNCTION public.check_number_of_activities_added_by_user();


--
-- Name: spozycie check_number_of_meals_added_today; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER check_number_of_meals_added_today BEFORE INSERT ON public.spozycie FOR EACH ROW EXECUTE FUNCTION public.check_number_of_meals_added_by_user();


--
-- Name: poczekalnia_produktow find_similar_product_before_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER find_similar_product_before_insert BEFORE INSERT ON public.poczekalnia_produktow FOR EACH ROW EXECUTE FUNCTION public.find_similar_product();


--
-- Name: makroelementy makroelementy_produkty_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.makroelementy
    ADD CONSTRAINT makroelementy_produkty_fk FOREIGN KEY (id_produktu) REFERENCES public.produkty(id);


--
-- Name: produkty produkty_rodzaje_produktow_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produkty
    ADD CONSTRAINT produkty_rodzaje_produktow_fk FOREIGN KEY (id_rodzaju) REFERENCES public.rodzaje_produktow(id);


--
-- Name: spozycie relation_4_produkty_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spozycie
    ADD CONSTRAINT relation_4_produkty_fk FOREIGN KEY (id_produktu) REFERENCES public.produkty(id);


--
-- Name: spozycie relation_4_uzytkownicy_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spozycie
    ADD CONSTRAINT relation_4_uzytkownicy_fk FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownicy(id);


--
-- Name: aktywnosci_fizyczne relation_6_sport_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aktywnosci_fizyczne
    ADD CONSTRAINT relation_6_sport_fk FOREIGN KEY (id_sportu) REFERENCES public.sport(id);


--
-- Name: aktywnosci_fizyczne relation_6_uzytkownicy_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aktywnosci_fizyczne
    ADD CONSTRAINT relation_6_uzytkownicy_fk FOREIGN KEY (id_uzytkownika) REFERENCES public.uzytkownicy(id);


--
-- Name: sport sport_dyscypliny_sportu_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sport
    ADD CONSTRAINT sport_dyscypliny_sportu_fk FOREIGN KEY (id_dyscypliny) REFERENCES public.dyscypliny_sportu(id);


--
-- Name: wartosci_odzywcze wartosci_odzywcze_produkty_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wartosci_odzywcze
    ADD CONSTRAINT wartosci_odzywcze_produkty_fk FOREIGN KEY (id_produktu) REFERENCES public.produkty(id);


--
-- PostgreSQL database dump complete
--

