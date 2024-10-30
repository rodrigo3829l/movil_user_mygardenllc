import { mount } from '@vue/test-utils';
import HelloWorld from '../../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Hello Vue!';
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.find('h1').text()).toBe(msg);
  });

  it('increments counter when button is clicked', async () => {
    const wrapper = mount(HelloWorld);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.find('p').text()).toBe('Counter: 1');
  });
});
