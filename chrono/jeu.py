while True:
    N = int(input("Entrez le nombre de nombre qu vous voulez saisir: "))
    if (10 <= N <= 50):break

nombres = []
for i in range(N):
    while True:
        n = int(input("Entrez le nombre de nombre qu vous voulez saisir: "))
        if (1 <= n <= 100):break
    nombres.append(n)

seqNombres = []
seq = []
for j in nombres:
    seq.append(j)
    if len(seq) >= 2:
        if j < seq[-2]:
            del seq[-1]
            seqNombres.append(seq)
            seq = [j]

print(seqNombres)
lenSeq = [len(s) for s in seqNombres]
print(f"laplus longue sequence de nombre est {seqNombres[lenSeq.index(max(lenSeq))]}")