import React from 'react';
import {DataTable} from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

function CurrentStock({ingredients, totalPage, handlePageChange}) {
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  const mapIngredientToDataTable = ingredients.items.map((item, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell style={{flex: 4}}>{item.name}</DataTable.Cell>
        <DataTable.Cell numeric>
          {item.amount} {item.unit}
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  let itemList =
    ingredients && ingredients.items && ingredients.items.length >= 1
      ? mapIngredientToDataTable
      : null;

  const label = `${ingredients.page + 1} of ${totalPage}`;

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 3}}>Ingredient Name</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>
      {itemList}
      <DataTable.Pagination
        page={ingredients.page}
        numberOfPages={totalPage}
        onPageChange={page => handlePageChange(page)}
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
