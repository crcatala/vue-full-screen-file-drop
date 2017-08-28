import { mount } from 'avoriaz';
import Component from '../src/VueFullScreenFileDrop';

describe('VueFullScreenFileDrop', () => {
  describe('drop zone area', () => {
    it('renders correct default text', () => {
      const wrapper = mount(Component);

      expect(wrapper.text()).toContain('Upload Files');
    });

    it('`text` prop overrides default text', () => {
      const wrapper = mount(Component, { propsData: { text: 'Taco' } });

      expect(wrapper.text()).toContain('Taco');
    });
  });

  describe('drop handler', () => {
    const file1 = new Blob(['taco.gif'], { type: 'image/gif' });
    const file2 = new Blob(['pizza.jpg'], { type: 'image/jpg' });
    const mockEvent = {
      preventDefault: () => {},
      dataTransfer: {
        files: [file1, file2],
      },
    };

    it('emits event with formData and files', () => {
      const wrapper = mount(Component);
      const $emit = jest.fn();
      wrapper.vm.$emit = $emit;

      wrapper.vm.onDrop(mockEvent);

      expect($emit.mock.calls.length).toBe(1);
      expect($emit.mock.calls[0][0]).toBe('drop');
      expect($emit.mock.calls[0][1].has('upload')).toBe(true);
      expect($emit.mock.calls[0][1].getAll('upload').length).toBe(2);
      expect($emit.mock.calls[0][1].getAll('upload')[0].type).toBe('image/gif');
      expect($emit.mock.calls[0][1].getAll('upload')[1].type).toBe('image/jpg');
      expect($emit.mock.calls[0][2].length).toBe(2);
      expect($emit.mock.calls[0][2][0].type).toBe('image/gif');
      expect($emit.mock.calls[0][2][1].type).toBe('image/jpg');
    });

    it('`formFieldName` prop sets the formData field', () => {
      const wrapper = mount(Component, {
        propsData: { formFieldName: 'custom' },
      });

      const $emit = jest.fn();
      wrapper.vm.$emit = $emit;

      wrapper.vm.onDrop(mockEvent);

      expect($emit.mock.calls.length).toBe(1);
      expect($emit.mock.calls[0][0]).toBe('drop');
      expect($emit.mock.calls[0][1].has('custom')).toBe(true);
    });
  });

  describe('drag enter handler', () => {
    const visibleSelector = '.vue-full-screen-file-drop--visible';
    const mockEvent = {
      target: 'dummy',
    };

    it('shows the drop zone', () => {
      const wrapper = mount(Component);
      wrapper.vm.onDragEnter(mockEvent);

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find(visibleSelector).length).toBe(1);
      });
    });
  });

  describe('drag leave handler', () => {
    const visibleSelector = '.vue-full-screen-file-drop--visible';
    const mockEvent = {
      target: 'dummy',
    };

    it('hides the drop zone', () => {
      const wrapper = mount(Component);
      wrapper.vm.onDragLeave(mockEvent);

      wrapper.vm.$nextTick(() => {
        expect(wrapper.find(visibleSelector).length).toBe(0);
      });
    });
  });
});
