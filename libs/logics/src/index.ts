import { assign, pick, keys } from 'lodash';

const sharedFunc = () => '안녕하세요?';

/**
 * objDest에 있는 속성들의 값들을 objSrc에서 추출해서 objDest에 덮어쓰기
 * @param objDest 덮어쓰는 대상 객체
 * @param objSrc 속성을 읽을 객체
 */
const assignOnlyExistingProperties = (objDest, objSrc) => {
  assign(objDest, pick(objSrc, keys(objDest)));
}

export { sharedFunc, assignOnlyExistingProperties };
export * from './crypt';
export * from './decorators';
export * from './pagination-input.dto';
export * from './pagination-output.dto';