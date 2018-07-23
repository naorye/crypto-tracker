/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/button';

storiesOf('Button', module)
    .add('with text', () => (
        <Button text="Click Me" onClick={ action('clicked') } />
    ))
    .add('disabled', () => (
        <Button text="Click Me" onClick={ action('clicked') } disabled />
    ));
