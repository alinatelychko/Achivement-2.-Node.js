--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2023-11-23 08:44:10 CET

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16561)
-- Name: directors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directors (
    directorid integer NOT NULL,
    directorname character varying(100) NOT NULL,
    directiorbio character varying(700) NOT NULL,
    directiorbirthdate character varying(100) NOT NULL
);


ALTER TABLE public.directors OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16566)
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genreid integer NOT NULL,
    genrename character varying(255) NOT NULL,
    genredescription character varying(700) DEFAULT 'DefaultDescription'::character varying
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16571)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    movieid integer NOT NULL,
    movietitle character varying(255) NOT NULL,
    directorid integer,
    genreid integer
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16591)
-- Name: usermoviepairs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usermoviepairs (
    pairid integer NOT NULL,
    userid integer,
    movieid integer
);


ALTER TABLE public.usermoviepairs OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16586)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL,
    emailaddress character varying(255) DEFAULT 'user@example.com'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3617 (class 0 OID 16561)
-- Dependencies: 215
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (1, 'Christopher Nolan', 'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.', 'July 30, 1970');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (2, 'Babak Anvari', 'Babak Anvari is known for Under the Shadow (2016), I Came By (2022) and Wounds (2019).', 'July 3, 1982');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (3, 'Todd Haynes', 'Todd Haynes is an American film director, screenwriter, and producer. His films span four decades with themes examining the personalities of well-known musicians, dysfunctional and dystopian societies, and blurred gender roles.', 'January 2, 1961');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (4, 'David Brucker', 'David Bruckner is an American film director. With Jacob Gentry and Dan Bush, he co-wrote and co-directed the 2007 horror film The Signal. Bruckner also co-wrote and directed the "Amateur Night" segment of the 2012 horror anthology film V/H/S, as well as directed the 2017 film The Ritual and the 2020 film The Night House.', '1977');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (5, 'Galder Gaztelu-Urrutia', 'Galder Gaztelu-Urrutia is a Spanish film and advertising director and producer. He made his feature-film debut with, The Platform (2019), a dystopian science fiction-horror film.', '17 February 1974');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (6, 'Thomas Bezucha', 'Bezucha was born and raised in Amherst, Massachusetts, and graduated from Amherst Regional High School in 1982. Bezucha graduated in fashion design from the Parsons School of Design, and worked as a creative services executive for Polo Ralph Lauren and Coach.He wrote and directed the films Big Eden (2000), The Family Stone (2005), Monte Carlo (2011), and Let Him Go (2020). He also co-wrote the films The Guernsey Literary and Potato Peel Pie Society (2018) and The Good House (2021).Bezucha is openly gay.', 'March 8, 1964');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (7, 'James Cameron', 'James Francis Cameron CC is a Canadian filmmaker. A major figure in the post-New Hollywood era, Cameron is considered one of the industry''s most innovative filmmakers, regularly making use of novel technologies with a classical filmmaking style.', 'August 16, 1954');
INSERT INTO public.directors (directorid, directorname, directiorbio, directiorbirthdate) VALUES (8, 'Gareth Edwards', 'Gareth James Edwards was born in the English town of Nuneaton, Warwickshire. Growing up, he admired movies such as the 1977 classic "Star Wars", and went on to pursue a film career. He even cites George Lucas and Steven Spielberg as his biggest influences. Edwards studied BA (Hons) Film & Video at the University for the Creative Arts in Farnham (formerly the Surrey Institute of Art & Design), graduating in 1996. In 2012, he received an honorary Master of Arts from UCA.', 'June 1, 1975');


--
-- TOC entry 3618 (class 0 OID 16566)
-- Dependencies: 216
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (1, 'Action', 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.');
INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (2, 'Horror', 'Horror films may incorporate incidents of physical violence and psychological terror; they may be studies of deformed, disturbed, psychotic, or evil characters; stories of terrifying monsters or malevolent animals; or mystery thrillers that use atmosphere to build suspense.');
INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (3, 'Romance', 'Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.');
INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (4, 'Social science fiction', 'Social science fiction is a subgenre of science fiction, usually (but not necessarily) soft science fiction, concerned less with technology/space opera and more with speculation about society. In other words, it "absorbs and discusses anthropology" and speculates about human behavior and interactions.');
INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (5, 'Comedy drama', 'Comedy drama, also known as the portmanteau dramedy, is a genre of dramatic works that combines elements of comedy and drama. The modern, scripted television examples tend to have more humorous bits than simple comic relief seen in a typical hour-long legal or medical drama but exhibit far fewer jokes per minute as in a typical half-hour sitcom.');
INSERT INTO public.genres (genreid, genrename, genredescription) VALUES (6, 'Sci-Fi', 'Usually futuristic, science fiction speculates about alternative ways of life made possible by technological change, and hence has sometimes been called "speculative fiction.');


--
-- TOC entry 3619 (class 0 OID 16571)
-- Dependencies: 217
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (1, 'Inception', 1, 1);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (2, 'Under The Shadow', 2, 2);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (3, 'Carol', 3, 3);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (4, 'The Ritual', 4, 2);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (5, 'The Platform', 5, 4);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (7, 'Titanic', 7, 3);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (8, 'Avatar', 7, 6);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (9, 'The Creator', 8, 6);
INSERT INTO public.movies (movieid, movietitle, directorid, genreid) VALUES (10, 'Tenet', 1, 1);


--
-- TOC entry 3621 (class 0 OID 16591)
-- Dependencies: 219
-- Data for Name: usermoviepairs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (1, 1, 1);
INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (2, 1, 5);
INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (3, 2, 3);
INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (4, 2, 8);
INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (6, 3, 9);
INSERT INTO public.usermoviepairs (pairid, userid, movieid) VALUES (5, 3, 2);


--
-- TOC entry 3620 (class 0 OID 16586)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (userid, username, emailaddress) VALUES (2, 'Lea', 'user@example.com');
INSERT INTO public.users (userid, username, emailaddress) VALUES (3, 'Nick', 'user@example.com');
INSERT INTO public.users (userid, username, emailaddress) VALUES (1, 'Kim', 'newemail2@example.com');


--
-- TOC entry 3461 (class 2606 OID 16565)
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (directorid);


--
-- TOC entry 3463 (class 2606 OID 16570)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genreid);


--
-- TOC entry 3465 (class 2606 OID 16575)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movieid);


--
-- TOC entry 3469 (class 2606 OID 16595)
-- Name: usermoviepairs usermoviepairs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usermoviepairs
    ADD CONSTRAINT usermoviepairs_pkey PRIMARY KEY (pairid);


--
-- TOC entry 3467 (class 2606 OID 16590)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3470 (class 2606 OID 16576)
-- Name: movies movies_directorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_directorid_fkey FOREIGN KEY (directorid) REFERENCES public.directors(directorid);


--
-- TOC entry 3471 (class 2606 OID 16581)
-- Name: movies movies_genreid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_genreid_fkey FOREIGN KEY (genreid) REFERENCES public.genres(genreid);


--
-- TOC entry 3472 (class 2606 OID 16601)
-- Name: usermoviepairs usermoviepairs_movieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usermoviepairs
    ADD CONSTRAINT usermoviepairs_movieid_fkey FOREIGN KEY (movieid) REFERENCES public.movies(movieid);


--
-- TOC entry 3473 (class 2606 OID 16596)
-- Name: usermoviepairs usermoviepairs_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usermoviepairs
    ADD CONSTRAINT usermoviepairs_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2023-11-23 08:44:11 CET

--
-- PostgreSQL database dump complete
--

