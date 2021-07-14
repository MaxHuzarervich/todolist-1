import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  args: {                                     //общие аргументы для двух историй ниже

  }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

