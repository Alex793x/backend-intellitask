--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Debian 15.7-1.pgdg110+1)
-- Dumped by pg_dump version 15.7 (Debian 15.7-1.pgdg110+1)

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
-- Name: accounts; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    user_id text,
    account_id text NOT NULL,
    provider_id text NOT NULL,
    access_token text,
    refresh_token text,
    access_token_expires_at text,
    refresh_token_expires_at text,
    scope text,
    id_token text,
    password text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.accounts OWNER TO "encore-admin";

--
-- Name: invitations; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.invitations (
    id text NOT NULL,
    inviter_id text NOT NULL,
    organization_id text NOT NULL,
    "teamId" text,
    email text NOT NULL,
    status text NOT NULL,
    role text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.invitations OWNER TO "encore-admin";

--
-- Name: members; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.members (
    id text NOT NULL,
    organization_id text NOT NULL,
    team_id text,
    user_id text NOT NULL,
    role text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.members OWNER TO "encore-admin";

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.organizations (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    logo text DEFAULT ''::text,
    metadata text DEFAULT ''::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.organizations OWNER TO "encore-admin";

--
-- Name: restricted_ai_base_models; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.restricted_ai_base_models (
    id uuid DEFAULT gen_random_uuid(),
    organization_id text NOT NULL,
    api_identifier text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.restricted_ai_base_models OWNER TO "encore-admin";

--
-- Name: restricted_ai_providers; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.restricted_ai_providers (
    id uuid DEFAULT gen_random_uuid(),
    organization_id text NOT NULL,
    provider text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.restricted_ai_providers OWNER TO "encore-admin";

--
-- Name: restricted_organization_members_ai_base_models; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.restricted_organization_members_ai_base_models (
    id uuid DEFAULT gen_random_uuid(),
    organization_id text NOT NULL,
    member_id text NOT NULL,
    api_identifier text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.restricted_organization_members_ai_base_models OWNER TO "encore-admin";

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO "encore-admin";

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    token text NOT NULL,
    user_id text NOT NULL,
    active_organization_id text,
    active_organization_member_id text,
    impersonated_by text DEFAULT ''::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    "ipAddress" text NOT NULL,
    "userAgent" text NOT NULL,
    active_organization_member_role text
);


ALTER TABLE public.sessions OWNER TO "encore-admin";

--
-- Name: team_members_relation_table; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.team_members_relation_table (
    id text NOT NULL,
    team_id text NOT NULL,
    member_id text NOT NULL,
    has_left boolean DEFAULT false,
    joined_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.team_members_relation_table OWNER TO "encore-admin";

--
-- Name: teams; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.teams (
    id text NOT NULL,
    name text NOT NULL,
    organization_id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teams OWNER TO "encore-admin";

--
-- Name: users; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean DEFAULT false,
    image text DEFAULT ''::text,
    role text DEFAULT 'user'::text,
    banned boolean DEFAULT false,
    ban_reason text DEFAULT ''::text,
    ban_expires integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO "encore-admin";

--
-- Name: verifications; Type: TABLE; Schema: public; Owner: encore-admin
--

CREATE TABLE public.verifications (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.verifications OWNER TO "encore-admin";

--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.accounts (id, user_id, account_id, provider_id, access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, scope, id_token, password, created_at, updated_at) FROM stdin;
wedede8OAtrnnMoaTn0z4mFD5R2JSq9q	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	credential	\N	\N	\N	\N	\N	\N	4a44c4cce7ba54bcd588ed67b68477b3:de6bbf641866040b766109fc13e065a5cdb0d943f0701d2bb18b52da6adb6ac4f2c363ac892667750cc46681acef305430a6a0507320df2b4f895ebc953a6ed7	2025-04-02 11:44:39.227	2025-04-02 11:44:39.227
z5XTieHqGJAbwYeDOhaSvIOG6Nyuh0iZ	bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	credential	\N	\N	\N	\N	\N	\N	f90d1a182fe49605d306a6b685c2987c:634f3f6e13c0a2ebfd443ddfd7c94ae8f1f959570bb09911e0991129d7e4855eea9ea4558344e9aff380f5a9d37f6ab8e32806e4d1471b9b02d47163a4bf5bf4	2025-04-02 11:48:00.302	2025-04-02 11:48:00.302
\.


--
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.invitations (id, inviter_id, organization_id, "teamId", email, status, role, expires_at, created_at) FROM stdin;
3VGA0UlcQjLqaf08Fy8wcp0goNOIhpeX	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	canceled	member	2025-04-02 11:56:00.3	2025-04-02 11:45:55.500438
G4KdxV3h8U9A0ZbdjfqgJwiaYmSM3BPO	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 11:57:40.752	2025-04-02 11:47:35.956733
PQnh75mtOmNq3bn7LiEiyyFI9v1athzl	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:08:28.961	2025-04-02 11:58:24.162602
ZIYVDYZdvtjO09WhMhaFHfqNlmQPERdT	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:09:19.661	2025-04-02 11:59:14.862414
9R9a852cLvU8HaKxWNy83pNbV5FXoQ2c	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	canceled	member	2025-04-02 12:42:47.52	2025-04-02 12:32:42.721248
NrRYkIq8vug2ImZbdYp79UaxMmabcdfx	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	canceled	member	2025-04-02 12:43:56.907	2025-04-02 12:33:52.110003
cSa361leWBqann2amzFbWIHpqlJlNeJw	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	canceled	member	2025-04-02 12:44:48.305	2025-04-02 12:34:43.506135
Z9aGiuYIhUmslT5fsQADksT9PWUHR1pU	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:48:22.118	2025-04-02 12:38:17.314215
n8tP8LB7SZtIJQroCAtybcmPbPm7gjdX	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:49:20.262	2025-04-02 12:39:15.458539
rAJea3wypKXBmybUJsywdJakVwt4cpaN	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:52:40.442	2025-04-02 12:42:35.642163
NOJfE8P1tqCYbGJ7xZc4LfjqGJEespl2	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 12:55:54.055	2025-04-02 12:45:49.260836
JcIlS086nOheo9GDTb4T2klmzWyesrNa	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 13:01:28.382	2025-04-02 12:51:23.583836
5KW7i1l30kSJpxKTp3FVXGoLzO8f81MI	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 13:02:25.794	2025-04-02 12:52:20.995552
CXyTv2f9rhaJTgHU7hfA1RTqhCotqDiY	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 13:04:07.476	2025-04-02 12:54:02.677211
B1WTVONGZZfNZ77FGbXUIRVgMkdKrDgx	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 13:05:45.793	2025-04-02 12:55:40.996344
wHyXZm7bcagmOMzMZnXboD64w4voMnwm	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N	labsander@hotmail.com	accepted	member	2025-04-02 13:07:22.063	2025-04-02 12:57:17.265273
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.members (id, organization_id, team_id, user_id, role, created_at) FROM stdin;
VMK09pN0zUZTivsdaSWxjgjXP1nDNE7Y	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	okAkECWjkcQjBDOLTfv5nh1YIhR5uvTA	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	owner	2025-04-02 11:45:55.465
g0suOfdXZUR7UhFWNBb4ANRo3clEoN46	WMcKRM9WfXOnfCOuj0n0enrcR3qNjkIS	X38NOAujWJ87YbjmHg5AXgZyijsW2M4M	bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	owner	2025-04-02 12:57:06.157
00SCQf4xBUqBOoj4mGpn9mb3pJVw5ygV	DfrErb1TUpWYd7gbQsDdUQzJdtehxRIS	tMAhDfC6w9ZGT8syZzRXuqscFwTfcvZv	bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	owner	2025-04-02 13:06:47.904
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.organizations (id, name, slug, logo, metadata, created_at) FROM stdin;
AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	BTC INK	btc-ink		{"description":"ejpgergre"}	2025-04-02 11:45:55.433
WMcKRM9WfXOnfCOuj0n0enrcR3qNjkIS	labsanders ink	labsanders-ink		{"description":"ejogerg"}	2025-04-02 12:57:06.138
DfrErb1TUpWYd7gbQsDdUQzJdtehxRIS	WOWOwefe	wowowefe		{"description":"egerger"}	2025-04-02 13:06:47.877
\.


--
-- Data for Name: restricted_ai_base_models; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.restricted_ai_base_models (id, organization_id, api_identifier, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: restricted_ai_providers; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.restricted_ai_providers (id, organization_id, provider, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: restricted_organization_members_ai_base_models; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.restricted_organization_members_ai_base_models (id, organization_id, member_id, api_identifier, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.schema_migrations (version, dirty) FROM stdin;
1	f
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.sessions (id, token, user_id, active_organization_id, active_organization_member_id, impersonated_by, created_at, updated_at, expires_at, "ipAddress", "userAgent", active_organization_member_role) FROM stdin;
NNs3xcM7CNpW1HBqlCW4oByodDuUpdbv	pmpqhVHdPWYLIn49sOKhCMdmT8Ubc0gk	TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	\N		2025-04-02 11:44:56.013	2025-04-02 11:46:20.005	2025-04-09 11:44:56.013		Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15	\N
QdXvuV18ekx8N3NC68QKZl8l0BRebH8E	cQR3D7V0uo9ykzaYKEs1pUzz3psJybGR	bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	WMcKRM9WfXOnfCOuj0n0enrcR3qNjkIS	\N		2025-04-02 12:31:58.449	2025-04-02 13:06:58.331	2025-04-09 12:31:58.447		Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36	\N
\.


--
-- Data for Name: team_members_relation_table; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.team_members_relation_table (id, team_id, member_id, has_left, joined_at) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.teams (id, name, organization_id, created_at, updated_at) FROM stdin;
okAkECWjkcQjBDOLTfv5nh1YIhR5uvTA	BTC INK	AfGKGw2BVSgVQYaC5XVSD0krQBmV2Eno	2025-04-02 11:45:55.45	2025-04-02 11:45:55.450516
X38NOAujWJ87YbjmHg5AXgZyijsW2M4M	labsanders ink	WMcKRM9WfXOnfCOuj0n0enrcR3qNjkIS	2025-04-02 12:57:06.148	2025-04-02 12:57:06.148524
tMAhDfC6w9ZGT8syZzRXuqscFwTfcvZv	WOWOwefe	DfrErb1TUpWYd7gbQsDdUQzJdtehxRIS	2025-04-02 13:06:47.899	2025-04-02 13:06:47.900016
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.users (id, name, email, email_verified, image, role, banned, ban_reason, ban_expires, created_at, updated_at) FROM stdin;
TD7zK7RlU3rYn3JEDnVGgvq012ERQeWb	alexander	alexanderbtcc@gmail.com	t		user	f		0	2025-04-02 11:44:39.131	2025-04-02 11:44:55.901
bXAnI6SOO7j7xBmqMr5UoQ1qNpDUVtgd	labsander	labsander@hotmail.com	t		user	f		0	2025-04-02 11:48:00.204	2025-04-02 11:48:11.683
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: encore-admin
--

COPY public.verifications (id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: invitations invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_slug_unique; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_slug_unique UNIQUE (slug);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: team_members_relation_table team_members_relation_table_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.team_members_relation_table
    ADD CONSTRAINT team_members_relation_table_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- Name: accounts_user_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX accounts_user_id_idx ON public.accounts USING btree (user_id);


--
-- Name: invitations_email_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX invitations_email_idx ON public.invitations USING btree (email);


--
-- Name: invitations_inviter_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX invitations_inviter_id_idx ON public.invitations USING btree (inviter_id);


--
-- Name: invitations_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX invitations_organization_id_idx ON public.invitations USING btree (organization_id);


--
-- Name: organizations_members_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX organizations_members_organization_id_idx ON public.members USING btree (organization_id);


--
-- Name: organizations_members_usesr_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX organizations_members_usesr_id_idx ON public.members USING btree (user_id);


--
-- Name: organizations_name_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX organizations_name_idx ON public.organizations USING btree (name);


--
-- Name: restricted_ai_base_model_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX restricted_ai_base_model_organization_id_idx ON public.restricted_ai_base_models USING btree (organization_id);


--
-- Name: restricted_ai_provider_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX restricted_ai_provider_organization_id_idx ON public.restricted_ai_providers USING btree (organization_id);


--
-- Name: restricted_organization_members_ai_base_models_member_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX restricted_organization_members_ai_base_models_member_id_idx ON public.restricted_organization_members_ai_base_models USING btree (member_id);


--
-- Name: restricted_organization_members_ai_base_models_organization_id_; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX restricted_organization_members_ai_base_models_organization_id_ ON public.restricted_organization_members_ai_base_models USING btree (organization_id);


--
-- Name: sessions_active_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX sessions_active_organization_id_idx ON public.sessions USING btree (active_organization_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX sessions_user_id_idx ON public.sessions USING btree (user_id);


--
-- Name: team_members_member_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX team_members_member_id_idx ON public.team_members_relation_table USING btree (member_id);


--
-- Name: team_members_team_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX team_members_team_id_idx ON public.team_members_relation_table USING btree (team_id);


--
-- Name: team_members_team_id_member_id_unique; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE UNIQUE INDEX team_members_team_id_member_id_unique ON public.team_members_relation_table USING btree (team_id, member_id);


--
-- Name: teams_organization_id_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX teams_organization_id_idx ON public.teams USING btree (organization_id);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: verifications_identifier_idx; Type: INDEX; Schema: public; Owner: encore-admin
--

CREATE INDEX verifications_identifier_idx ON public.verifications USING btree (identifier);


--
-- Name: accounts accounts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invitations invitations_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: invitations invitations_teamId_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT "invitations_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: members members_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: members members_team_id_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_team_id_teams_id_fk FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_members_relation_table team_members_relation_table_member_id_members_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.team_members_relation_table
    ADD CONSTRAINT team_members_relation_table_member_id_members_id_fk FOREIGN KEY (member_id) REFERENCES public.members(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_members_relation_table team_members_relation_table_team_id_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.team_members_relation_table
    ADD CONSTRAINT team_members_relation_table_team_id_teams_id_fk FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: teams teams_organization_id_organizations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: encore-admin
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_organization_id_organizations_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

