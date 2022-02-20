import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  TagField,
} from "@pankod/refine-antd";

import { ICompany } from "interfaces";

export const CompanyList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ICompany>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          key="name"
          title="Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="location"
          key="location"
          title="Location"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("location", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="isActive"
          key="isActive"
          title="Is Active"
          render={(value) => <TagField value={value} />}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
          sorter
        />
        <Table.Column<ICompany>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
