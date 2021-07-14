import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLISTS/Task',
  component: Task,
  args: {                                     //общие аргументы для двух историй ниже
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle')
  }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
  todoListID: '1',
  task: {id: '11', isDone:true, title:'JS'}
}
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
  todoListID: '1',
  task: {id: '12', isDone:false, title:'JS'},
}