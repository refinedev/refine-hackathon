import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, LoginPage } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine-antd/dist/styles.min.css";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";

import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import { JobList, JobCreate, JobEdit } from "pages/jobs";
import { authProvider, axios } from "./authProvider";

function App() {
    const API_URL = "http://localhost:3000";
    const dataProvider = nestjsxCrudDataProvider(API_URL, axios);

    return (
        <Refine
            routerProvider={routerProvider}
            notificationProvider={notificationProvider}
            Layout={Layout}
            dataProvider={dataProvider}
            authProvider={authProvider}
            LoginPage={LoginPage}
            resources={[{
                name: "companies",
                list: CompanyList,
                create: CompanyCreate,
                edit: CompanyEdit,
                show: CompanyShow
            }, {
                name: "jobs",
                list: JobList,
                create: JobCreate,
                edit: JobEdit,
                show: CompanyShow
            }]}
        />
    );
}

export default App;
