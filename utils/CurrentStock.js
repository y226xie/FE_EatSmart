import React from 'react';
import {DataTable} from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

function CurrentStock({items}) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  let itemList = items.map((item, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
        <DataTable.Cell numeric>{item.expiry}</DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <DataTable>
      {itemList}
      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={page => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
}

export default CurrentStock;
