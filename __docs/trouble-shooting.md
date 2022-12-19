## Error: P1013: The provided database string is invalid. invalid port number in database URL.

> Error: P1013: The provided database string is invalid. invalid port number in database URL. Please refer to the documentation in https://www.prisma.io/docs/reference/database-reference/connection-urls for constructing a correct connection string. In some cases, certain characters must be escaped. Please check the string for any illegal characters.

postgresql connection string내에 특수문자가 있을 경우 encoding하지 않으면 연결되지 않습니다.
([참고](https://www.prisma.io/docs/reference/database-reference/connection-urls#special-characters)]

특수문자를 encoding 문자로 변경하거나 특수문자를 제거하면 해결됩니다.

## Module not found: Can't resolve (,,,)

> https://vercel.com/guides/how-do-i-resolve-a-module-not-found-error

여러 케이스가 있지만 제 케이스는 다음과 같습니다.

프로젝트 진행 중에 파일명을 소문자에서 대문자로 변경한 일이 있었는데 git ignorecase가 켜져있어서 발생한 문제였습니다.

다음과 같이 git config를 변경하고 commit하면 해결됩니다.
(git에는 변경되기 전 파일이 그대로 남아있을 수 있으니 git rm을 통해 삭제해주는게 좋습니다.)

```bash
git config core.ignorecase false
```
