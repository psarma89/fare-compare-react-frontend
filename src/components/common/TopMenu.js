import React from 'react';
import { Menu, Icon} from 'semantic-ui-react';

const TopMenu = (props) => {
  return(
    <Menu attached='top'>
      <Menu.Item
        name='menu'
        onClick={props.toggleVisibility}
      >
        <Icon name='sidebar' />
      </Menu.Item>
      {props.menuSearch}
    </Menu>

  )
}

export default TopMenu;
