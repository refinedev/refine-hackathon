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
import { ac } from "./ac";

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
            accessControlProvider={{
                can: async ({ resource, action }) => {
                    let can: boolean = false;
                    const stringifyUser = localStorage.getItem('refine-user');
                    if (stringifyUser) {
                        const { roles } = JSON.parse(stringifyUser);

                        roles.forEach((role: string) => {
                            switch (action) {
                                case 'list':
                                case 'show':
                                    can = ac.can(role).read(resource).granted;
                                    break;
                                case 'create':
                                    can = ac.can(role).create(resource).granted;
                                    break;
                                case 'edit':
                                    can = ac.can(role).update(resource).granted;
                                    break;
                                case 'delete':
                                    can = ac.can(role).delete(resource).granted;
                                    break;
                            }
                        });


                    }
                    return Promise.resolve({ can });
                },
            }}
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
