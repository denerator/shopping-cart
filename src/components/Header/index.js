import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => (
            <div>
                <Menu>
                    <Menu.Item>Online store</Menu.Item>
                    <Menu.Menu position="right" >
                        <Menu.Item>Summary: 0,00 </Menu.Item>
                        <Menu.Item>Cart</Menu.Item>
                        
                    </Menu.Menu>
                </Menu>   
            </div>
            );

        
export default Header;