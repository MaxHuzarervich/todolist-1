import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
  argTypes: {
    changeTitle: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
  changeTitle: action('Value EditableSpan changed')
}

