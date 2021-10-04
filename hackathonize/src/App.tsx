import { Refine, Resource } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import { dataProvider } from "@pankod/refine-supabase";

import authProvider from "./authProvider";
import { supabaseClient } from "utility";
import { Login } from "./pages/login";
// import { TeamsList, TeamsCreate, TeamsEdit, TeamsShow } from "./pages/teams";
import {
  HackathonersList,
  HackathonersCreate,
  HackathonersEdit,
  HackathonersShow,
} from "./pages/hackathoners";
import {
  HackathonsList,
  HackathonsCreate,
  HackathonsEdit,
  HackathonsShow,
} from "./pages/hackathons";
import {
  ProjectsList,
  ProjectsCreate,
  ProjectsEdit,
  ProjectsShow,
} from "./pages/projects";
import {
  CriteriasList,
  CriteriasCreate,
  CriteriasEdit,
  CriteriasShow,
} from "./pages/criterias";
import { DashboardPage } from "./pages/dashboard";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      LoginPage={Login}
      DashboardPage={DashboardPage}
    >
      <Resource
        name="hackathons"
        list={HackathonsList}
        create={HackathonsCreate}
        edit={HackathonsEdit}
        show={HackathonsShow}
      />
      <Resource
        name="projects"
        list={ProjectsList}
        create={ProjectsCreate}
        edit={ProjectsEdit}
        show={ProjectsShow}
      />
      <Resource
        name="hackathoners"
        list={HackathonersList}
        create={HackathonersCreate}
        edit={HackathonersEdit}
        show={HackathonersShow}
      />
      <Resource
        name="criterias"
        list={CriteriasList}
        create={CriteriasCreate}
        edit={CriteriasEdit}
        show={CriteriasShow}
      />
      {/* <Resource
        name="teams"
        list={TeamsList}
        create={TeamsCreate}
        edit={TeamsEdit}
        show={TeamsShow}
      /> */}
    </Refine>
  );
}

export default App;
