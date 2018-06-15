import { deepMerge } from '../../src/utils/lang';

describe('LangUtil', () => {
  describe('deepMerge', () => {
    it('should deep merge multiple objects', () => {
      const person = {
        name: 'Nico',
        age: 21
      };
      const devMixin = {
        props: {
          jobTitle: 'Software Developer',
          company: 'Micromata GmbH'
        }
      };
      const lazyMixin = {
        props: {
          lazy: true
        }
      };
      const merged = deepMerge(person, devMixin, lazyMixin);
      expect(merged.name).toEqual(person.name);
      expect(merged.props.lazy).toBeTruthy();
      expect(merged.props.company).toEqual(devMixin.props.company);
    });
  });
});
