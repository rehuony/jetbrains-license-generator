Operation guide:
    1. add -javaagent:/path/to/ja-netfilter.jar=jetbrains to your vmoptions
    2. log out of the jb account in the 'Licenses' window
    3. use key on page https://jetbrains.rehug.cc
    4. plugin 'mymap' has been deprecated since version 2022.1
    5. don't care about the activation time, it is a fallback license and will not expire

Enjoy it~

JBR17:
    add these 2 lines to your vmoptions file: (for manual, without any whitespace chars)
    --add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
    --add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
