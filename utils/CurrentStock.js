import React from 'react';
import {DataTable} from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

function CurrentStock(props) {
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  // React.useEffect(() => {
  //   setPage(0);
  // }, [itemsPerPage]);

  let itemList = props.ingredients.items.map((item, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell style={{flex: 4}}>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric>
          {item.amount} {item.unit}
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  const label = `${props.ingredients.page + 1} of ${props.totalPage}`;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 3}}>Ingredient Name</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>
      {itemList}
      <DataTable.Pagination
        page={props.ingredients.page}
        numberOfPages={props.totalPage}
        onPageChange={page => props.handlePageChange(page)}
        label={label}
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
