import React from 'react'
import { Menu as MenuTag } from 'semantic-ui-react'
import '../css/Portfolio.css'

const Menu = () => {
  return (
    <MenuTag inverted fixed="top">
      <MenuTag.Item
        link
        name='GitHub'
        href="https://github.com/Talkwondo/"
        target="_blank"
      />
      <MenuTag.Item
        link
        name='Linkdin'
        href="https://www.linkedin.com/in/tal-talmon/"
        target="_blank"
      />
      <MenuTag.Item
        position='right'
        link
        name='Tal Talmon Portfolio'
        href="mailto: tal@tkd.co.il"
      />
    </MenuTag>
  )
}

export default Menu
