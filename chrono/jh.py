def decode(s: str) -> str:
    stack = []
    s = list(s)  # plus simple à manipuler
    for i, ch in enumerate(s):
        if ch == "(":
            stack.append(i)
        elif ch == ")":
            start = stack.pop()
            end = i
            # renverser la sous-chaîne entre ( et )
            s[start:end+1] = s[start+1:end][::-1]
            return decode("".join(s))  # appel récursif pour traiter le reste
    return "".join(s)


# Exemple
mot = "we(ke(fjfds)owe)"
print(decode(mot))  
# sortie attendue: "weewofdsfjke"