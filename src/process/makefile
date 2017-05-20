# process
process:
	python goeventsToCorpus.py
	python goeventsToSentence.py
	python combine.py

count=1
# train
crf_train:
	.\CRF++-0.58\crf_learn -c 600.1 .\templatechunk .\combine_train.txt .\output\model

# test
crf_test:
	.\CRF++-0.58\crf_test -m .\output\model .\combine_test.txt >> .\output\test-info.txt
	python accuracy.py

clean:
	del .\output\*
	del .\rrr.txt .\index.txt .\sentence.txt .\goeventsCorpus.txt