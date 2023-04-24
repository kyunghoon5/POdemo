import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const TreeViewDownload = ({ handleDownload17 }) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="ItemReorderAlert">
        <TreeItem
          nodeId="2"
          label="ItemReorderList.xlsx"
          onClick={handleDownload17}
        />
      </TreeItem>
    </TreeView>
  );
};

export default TreeViewDownload;
