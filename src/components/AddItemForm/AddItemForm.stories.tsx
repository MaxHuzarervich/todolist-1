import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddItemForm } from './AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem:{
      description: 'Button clicked'
    }
  }
} as ComponentMeta<typeof AddItemForm>;
      //шаблон
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
  addItem: action('Button clicked')
}